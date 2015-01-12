<?php
namespace fibe\ImportBundle\Services;

use Doctrine\Common\Annotations\Reader;
use Doctrine\ORM\EntityManagerInterface;
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

    function __construct(SecurityContextInterface $security, Reader $reader)
    {
        $this->reader = $reader;
        $this->security = $security;
    }

    /**
     * @param array $datas
     * @param $shortClassName
     * @param \fibe\EventBundle\Entity\MainEvent $mainEvent
     * @param \Doctrine\ORM\EntityManagerInterface $em
     * @throws \Symfony\Component\Security\Core\Exception\AccessDeniedException
     * @return array
     */
    public function importEntities(array $datas, $shortClassName, MainEvent $mainEvent, EntityManagerInterface $em)
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
                    $value = $row[$j];
                    /** @var Importer $fieldConfig */
                    $fieldConfig = $header[$j];

                    if (null != $linkedEntityClassName = $fieldConfig->targetEntity)
                    { //its a linked entity!

                        //create the linked entity
                        //                    $linkedEntity = new $linkedEntityClassName();
                        //                    $setter = "set" . ucwords($uniqField);
                        //                    $linkedEntity->$setter($value);

                        //get the linked entity
                        $linkedEntity = $em->getRepository($linkedEntityClassName)->findOneBy(array($fieldConfig->uniqField => $value));
                        if (!$linkedEntity)
                        {
                            if ($fieldConfig->optional)
                            {
                                break; //break the for loop
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

                        $value = $linkedEntity;
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
                    "line"   => $ex->getLine(),
                    "column" => $ex->getColumn(),
                    "columnNb" => $ex->getColumnNb(),
                    "value"  => $ex->getValue(),
                    "msg"    => $ex->getMessage()
                );
            }
        }

        return $return;
    }

    function getClassNameFromShortClassName($shortClassName)
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

        $importFields = $this->getImportConfig($className, $this->reader, $asString);

        return $importFields;
    }

    protected function getImportConfig($entityClassName, Reader $reader, $asString)
    {
        $importFields = [];
        $importerAnnotationClass = get_class(new Importer());

        $reflectionObject = new \ReflectionObject(new $entityClassName());
        foreach ($reflectionObject->getProperties() as $reflectionProperty)
        {
            /** @var Importer $importerAnnot */
            $importerAnnot = $reader->getPropertyAnnotation($reflectionProperty, $importerAnnotationClass);
            if (null !== $importerAnnot)
            {
                $importerAnnot->propertyName = $reflectionProperty->getName();
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
}