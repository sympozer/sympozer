<?php
namespace fibe\ImportBundle\Services;

use DateTime;
use Doctrine\Common\Annotations\Reader;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Column;
use fibe\EventBundle\Entity\MainEvent;
use fibe\ImportBundle\Annotation\Importer;
use fibe\ImportBundle\Exception\SympozerImportErrorException;
use fibe\SecurityBundle\Services\Acl\ACLHelper;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 *
 * @author benoitddlp
 */
class ImportService
{
    const IMPORT_ALL = "all";
    const COLLECTION_SEPARATOR = ",";
    const DATE_FORMAT = 'Y-m-d';
    const DATETIME_FORMAT = 'Y-m-d H:i';

    protected $reader;
    protected $security;
    protected $em;

    function __construct(SecurityContextInterface $security, Reader $reader, EntityManagerInterface $em)
    {
        $this->reader = $reader;
        $this->security = $security;
        $this->em = $em;
    }

    /**
     * Do the unserialization between incoming datas to entities
     * @param array $datas
     * @param $shortClassName
     * @param \fibe\EventBundle\Entity\MainEvent $mainEvent
     * @throws \Symfony\Component\Security\Core\Exception\AccessDeniedException
     * @return array
     */
    public function importEntities(array $datas, $shortClassName, MainEvent $mainEvent)
    {

        $entityClassName = $this->getClassNameFromShortClassName($shortClassName);

        //create a new entity
        $entity = new $entityClassName();
        $entity->setMainEvent($mainEvent);

        //perform acl check
        $right = "CREATE";
        if (false === $this->security->isGranted($right, $entity))
        {
            throw new AccessDeniedException(
                sprintf('You don\'t have the authorization to perform %s on %s',
                    $right,
                    '#' . $entity->getId()
                )
            );
        }
        $header = $this->getImportConfigFromShortClassName($shortClassName);
//        \Doctrine\Common\Util\Debug::dump($header);
        $return = array("errors" => array(), "imported" => 0);
        //loop over received rows
        for ($i = 0; $i < count($datas); $i++)
        {
            $row = $datas[$i];

            $entityInstance = clone $entity;

            try // catch SympozerImportErrorException
            {
                //loop over importable properties
                for ($j = 0; $j < count($header); $j++)
                {
                    /** @var Importer $fieldConfig */
                    $fieldConfig = $header[$j];

                    //check empty / mandatory
                    if (!isset($row[$j]) || empty($row[$j]))
                    { //no data sent for this field
                        if (!$fieldConfig->optional)
                        {
                            throw new SympozerImportErrorException(
                                sprintf("field '%s' is mandatory.",
                                    $fieldConfig->propertyName
                                ),
                                $i + 1,
                                $j + 1,
                                (string) $fieldConfig,
                                "empty");
                        }
                        else
                        {
                            continue;
                        }
                    }
                    $value = $row[$j];

                    //check linked entity/collection
                    if (null != $linkedEntityClassName = $fieldConfig->targetEntity)
                    { //its a linked entity!
                        if ($fieldConfig->collection)
                        { //its a collection of linked entity
                            $values = explode(self::COLLECTION_SEPARATOR, $value);
                            $value = array();
                            for ($k = 0; $k < count($values); $k++)
                            {
                                if (false == $linkedEntity = $this->getOrCreateLinkedEntity($linkedEntityClassName, $fieldConfig, $values[$k], $i, $j))
                                {
                                    break; //break the for loop
                                }
                                $value[] = $linkedEntity;
                            }
                        }
                        else
                        {
                            if (false == $linkedEntity = $this->getOrCreateLinkedEntity($linkedEntityClassName, $fieldConfig, $value, $i, $j))
                            {
                                break; //break the for loop
                            }
                            $value = $linkedEntity;
                        }
                    }

                    //check date/datetime format
                    if (null != $dateFormat = $fieldConfig->dateFormat)
                    { //its a date/datetime entity!
                        if (!$date = DateTime::createFromFormat($dateFormat, $value))
                        {
                            throw new SympozerImportErrorException(
                                sprintf("Date '%s' is not well formatted: format is %s",
                                    $fieldConfig->propertyName,
                                    $dateFormat
                                ),
                                $i + 1,
                                $j + 1,
                                (string) $fieldConfig,
                                $value);
                        }
                        $value = $date;
                    }

                    //call the setter
                    $setter = "set" . ucwords($fieldConfig->propertyName);
                    $entityInstance->$setter($value);
                }

                $return["entities"][] = $entityInstance;
                $return["imported"]++;
            }
            catch (SympozerImportErrorException $ex)
            {
                if (!isset($return["errors"][$ex->getLine()]))
                {
                    $return["errors"][$ex->getLine()] = array();
                }
                $return["errors"][$ex->getLine()][$ex->getColumnNb()] = array(
                    "line"     => $ex->getLine(),
                    "column"   => $ex->getColumn(),
                    "columnNb" => $ex->getColumnNb(),
                    "value"    => $ex->getValue(),
                    "msg"      => $ex->getMessage()
                );
            }
        }

        return $return;
    }

    protected function getClassNameFromShortClassName($shortClassName)
    {
        if (isset(ACLHelper::$ACLEntityNameArray[$shortClassName]))
        {
            return ACLHelper::$ACLEntityNameArray[$shortClassName]["classpath"] . "\\" . $shortClassName;
        }
        throw new \Exception("$shortClassName' is not configured to be imported");
    }

    public function getImportConfigFromShortClassName($shortClassName, $asString = false)
    {
        $className = $this->getClassNameFromShortClassName($shortClassName);

        $importFields = $this->getImportConfig($className, $asString);

        return $importFields;
    }

    /**
     * Parses Importer annotation and return the whole import config for $entityClassName
     * @param $entityClassName
     * @param $asString
     * @return array
     */
    protected function getImportConfig($entityClassName, $asString)
    {
        $importFields = [];
        $importerAnnotationClass = get_class(new Importer());
        $columnAnnotationClass = get_class(new Column());

        $reflectionObject = new \ReflectionObject(new $entityClassName());
        foreach ($reflectionObject->getProperties() as $reflectionProperty)
        {
            /** @var Importer $importerAnnot */
            if (null !== $importerAnnot = $this->reader->getPropertyAnnotation($reflectionProperty, $importerAnnotationClass))
            {
                $importerAnnot->propertyName = $reflectionProperty->getName();

                /** @var Column $columnAnnot */
                if (null !== $columnAnnot = $this->reader->getPropertyAnnotation($reflectionProperty, $columnAnnotationClass))
                {
                    switch ($columnAnnot->type)
                    {
                        case "datetime":
                            $importerAnnot->dateFormat = self::DATETIME_FORMAT;
                            break;
                        case "date":
                            $importerAnnot->dateFormat = self::DATE_FORMAT;
                            break;
                    }
                }

                if ($asString)
                {
                    $fieldName = (string) $importerAnnot; //call __toString()
                }
                else
                {
                    $fieldName = $importerAnnot;
                }
                $importFields[] = $fieldName;
            }
        }

        return $importFields;
    }

    /**
     * @param string $linkedEntityClassName the classname
     * @param Importer $fieldConfig the configuration
     * @param string $value the input value
     * @param int $i current line of parsed datas
     * @param int $j current field of parsed datas
     * @return false|object                      the entity | false if the field isn't provided and isn't required
     * @throws SympozerImportErrorException     if the field is mandatory & not configured to be created & not found
     */
    function getOrCreateLinkedEntity($linkedEntityClassName, Importer $fieldConfig, $value, $i, $j)
    {
        //get the linked entity
        $linkedEntity = $this->em->getRepository($linkedEntityClassName)->findOneBy(array($fieldConfig->uniqField => $value));

        //or create if configured for
        if (!$linkedEntity && $fieldConfig->create)
        {
            $linkedEntity = new $linkedEntityClassName();
            $setter = "set" . ucwords($fieldConfig->uniqField);
            $linkedEntity->$setter($value);
            $this->em->persist($linkedEntity);
        }

        if (!$linkedEntity)
        {
            if ($fieldConfig->optional)
            {
                return false; //break the for loop
            }
            throw new SympozerImportErrorException(
                sprintf("%s with field '%s' = '%s' was not found and is mandatory.",
                    $fieldConfig->getTargetEntityShortClassName(),
                    $fieldConfig->uniqField,
                    $value
                ),
                $i + 1,
                $j + 1,
                (string) $fieldConfig,
                $value);
        }

        return $linkedEntity;
    }
}