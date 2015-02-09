<?php
namespace fibe\ImportBundle\Services;

use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use fibe\EventBundle\Entity\MainEvent;
use fibe\ImportBundle\Annotation\Importer;
use fibe\ImportBundle\Exception\SympozerImportErrorException;
use fibe\SecurityBundle\Services\Acl\ACLHelper;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 * @author benoitddlp
 */
class ImportService
{
    const COLLECTION_SEPARATOR = ",";

    protected $importConfig;
    protected $security;
    protected $em;
    protected $log;

    function __construct(ImportConfigService $importConfig, SecurityContextInterface $security, EntityManagerInterface $em, LoggerInterface $log)
    {
        $this->importConfig = $importConfig;
        $this->security = $security;
        $this->em = $em;
        $this->log = $log;
    }

    /**
     * Do the deserialization between incoming datas to entities
     * @param array $datas
     * @param $shortClassName
     * @param \fibe\EventBundle\Entity\MainEvent $mainEvent
     * @throws \Symfony\Component\Security\Core\Exception\AccessDeniedException
     * @return array
     */
    public function importEntities(array $datas, MainEvent $mainEvent, $shortClassName = "")
    {

        $return = array("errors" => array(), "imported" => 0, "entities" => array());

        //loop over received rows
        for ($i = 0; $i < count($datas); $i++)
        {
            $row = $datas[$i];

            $entityInstance = $this->getOrCreateEntity($row, $mainEvent, $shortClassName);
            $header = $this->importConfig->fromClassName(get_class($entityInstance));

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
                                    $fieldConfig->name
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
                                {  //linked entity isn't mandatory
                                    break; //break the for loop
                                }
                                $value[] = $linkedEntity;
                            }
                        }
                        else
                        {
                            if (false == $linkedEntity = $this->getOrCreateLinkedEntity($linkedEntityClassName, $fieldConfig, $value, $i, $j))
                            { //entity is null => cancel field import
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
                                    $fieldConfig->name,
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
                    $setter = "set" . ucwords($fieldConfig->name);

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
                    "line" => $ex->getLine(),
                    "column" => $ex->getColumn(),
                    "columnNb" => $ex->getColumnNb(),
                    "value" => $ex->getValue(),
                    "msg" => $ex->getMessage()
                );
            }
        }

        return $return;
    }

    protected function getOrCreateEntity(array $row, MainEvent $mainEvent, $shortClassName)
    {
        if (isset($row[0]) && !empty($row[0]))
        {
            $entityTpl = $this->checkACL($shortClassName, $mainEvent);

            //create if no importCode provided
            if (!isset($row[1]) || empty($row[1]))
            {
                $this->log->debug("[ImportService] INSERT : no importCode provided");
                return clone $entityTpl;
            }
            $importCode = $row[1];

            //get if no importCode is registered for this mainEvent
            if (null != $entity = $this->em->getRepository(get_class($entityTpl))->findOneBy(array(
                    "importCode" => $importCode,
                    "mainEvent" => $entityTpl->getMainEvent()
                ))
            )
            {
                $this->log->debug("[ImportService] UPDATE : importCode $importCode is registered for mainEvent '" . $entityTpl->getMainEvent()->getId() . "'.");
                return $entity;
            }
            else
            { //create if no importCode is unregistered for this mainEvent

                $this->log->debug("[ImportService] INSERT : importCode $importCode is not registered for mainEvent '" . $entityTpl->getMainEvent()->getId() . "'.");
                return clone $entityTpl;
            }
        }
    }

//    protected function getOrCreateEntity($row, $entityTpl)

//    {
//        //create if no importCode provided
//        if (!isset($row[0]) || empty($row[0]))
//        {
//            $this->log->debug("[ImportService] INSERT : no importCode provided");
//            return clone $entityTpl;
//        }
//        $importCode = $row[0];
//
//        //get if no importCode is registered for this mainEvent
//        if (null != $entity = $this->em->getRepository(get_class($entityTpl))->findOneBy(array(
//                "importCode" => $importCode,
//                "mainEvent" => $entityTpl->getMainEvent()
//            ))
//        )
//        {
//            $this->log->debug("[ImportService] UPDATE : importCode $importCode is registered for mainEvent '" . $entityTpl->getMainEvent()->getId() . "'.");
//            return $entity;
//        }
//        else
//        { //create if no importCode is unregistered for this mainEvent
//
//            $this->log->debug("[ImportService] INSERT : importCode $importCode is not registered for mainEvent '" . $entityTpl->getMainEvent()->getId() . "'.");
//            return clone $entityTpl;
//        }
//    }

    /**
     * checkACL
     * @param $shortClassName
     * @param MainEvent $mainEvent
     * @return
     * @throws AccessDeniedException
     */
    protected function checkACL($shortClassName, MainEvent $mainEvent)
    {
        $entityClassName = ACLHelper::getClassNameFromShortClassName($shortClassName);

        //create a new entity
        $entity = new $entityClassName();
        $entity->setMainEvent($mainEvent);

        //perform acl check
        $right = "OPERATOR";
        if (false === $this->security->isGranted($right, $entity))
        {
            throw new AccessDeniedException(
                sprintf('You don\'t have the authorization to perform %s on %s',
                    $right,
                    '#' . $entity->getId()
                )
            );
        }
        return $entity;
    }

    /**
     * getOrCreateLinkedEntity
     *
     * @param string $linkedEntityClassName the classname
     * @param Importer $fieldConfig the configuration
     * @param string $value the input value
     * @param int $i current line of parsed datas
     * @param int $j current field of parsed datas
     * @return false|object                      the entity | false if the field isn't provided and isn't required
     * @throws SympozerImportErrorException     if the field is mandatory & not configured to be created & not found
     */
    protected function getOrCreateLinkedEntity($linkedEntityClassName, Importer $fieldConfig, $value, $i, $j)
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