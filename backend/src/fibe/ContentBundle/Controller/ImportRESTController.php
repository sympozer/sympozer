<?php

namespace fibe\ContentBundle\Controller;

use Doctrine\Common\Annotations\Reader;
use Doctrine\ORM\EntityManagerInterface;
use fibe\ContentBundle\Annotation\Importer;
use fibe\ContentBundle\Exception\SympozerImportErrorException;
use fibe\SecurityBundle\Services\Acl\ACLHelper;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * Import rest controller.
 */
class ImportRESTController extends FOSRestController
{


    const IMPORT_ALL = "all";
    const IMPORTER_ANNOTATION = 'fibe\\ContentBundle\\Annotation\\Importer';

    /**
     * controller used to expose url to ws-config
     *
     * @Rest\Get("/import", name="content_import_get_header")
     * @Rest\View
     */
    public function importAction(Request $request, $shortClassName)
    {
    }

    /**
     * Get import config in json.
     * The config is got from Importer annotations for the given entity provided by $entityLabel
     * @Rest\Get("/import/{entityLabel}", defaults={"entityLabel" = "all"})
     * @Rest\View
     */
    public function getImportHeaderAction(Request $request, $entityLabel)
    {
        //TODO put this in a dedicated importService
        $header = $this->getImportConfigFromShortClassName($entityLabel, true);

        return array(
            "header" => $header,
            "entity" => $entityLabel
        );
    }

    //TODO put this in a dedicated importService


    protected function getImportConfigFromShortClassName($shortClassName, $asString = false)
    {
        $reader = $this->get("annotations.reader");

        $className = $this->getClassNameFromShortClassName($shortClassName);

        $importFields = getImportConfig($className, $reader, $asString);

        return $importFields;

        function getImportConfig($entityClassName, Reader $reader, $asString)
        {
            $importFields = [];
            $importerAnnotationClass = self::IMPORTER_ANNOTATION;;

            $reflectionObject = new \ReflectionObject(new $entityClassName());
            foreach ($reflectionObject->getProperties() as $reflectionProperty)
            {
                /** @var \fibe\ContentBundle\Annotation\Importer $importerAnnot */
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


    protected function getClassNameFromShortClassName($shortClassName)
    {
        if (isset(ACLHelper::$ACLEntityNameArray[$shortClassName]))
        {
            return ACLHelper::$ACLEntityNameArray[$shortClassName]["classpath"] . "\\" . $shortClassName;
        }
        throw new \Exception("$shortClassName' is not configured to be imported");
    }
    /**
     * import entities of one type
     * @param $datas array
     * @param $entity
     * @param $header
     * @param EntityManagerInterface $em
     * @return array
     */
    //TODO put this in a dedicated importService
    /**
     * Get a sample csv file to download.
     * The sample is got from Importer annotations for the given entity provided by $entityLabel
     *
     * @Rest\Get("/import/{entityLabel}-sample.csv", defaults={"entityLabel" = "all"})
     */
    public function getImportSampleAction(Request $request, $entityLabel)
    {
        //TODO put this in a dedicated importService
        $header = $this->getImportConfigFromShortClassName($entityLabel, true);

        $handle = fopen('php://memory', 'r+');

        fputcsv($handle, $header);

        rewind($handle);
        $content = stream_get_contents($handle);
        fclose($handle);

        return new Response($content, 200, array(
            'Content-Type'        => 'application/force-download',
            'Content-Disposition' => 'attachment; filename="import-' . strtolower($entityLabel) . '-sample.csv"'
        ));
    }

    /**
     * get an array of Importer annotation which is containing Importer Configuration
     * @param $shortClassName
     * @param bool $asString
     * @return array of Importer|string
     */
    //TODO put this in a dedicated importService
    /**
     * Process received datas.
     *
     * The config is got from Importer annotations for the given entity provided by $entityLabel
     * and is used to parse input datas.
     *
     *
     * @Rest\Post("/mainEvents/{mainEventId}/import/{entityLabel}", defaults={"entityLabel" = "all"})
     * @Rest\View
     */
    public function postImportAction(Request $request, $mainEventId, $entityLabel)
    {
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        $header = $this->getImportConfigFromShortClassName($entityLabel);
        /** @var EntityManagerInterface $em */
        $em = $this->get("doctrine.orm.entity_manager");
        $mainEvent = $this->getMainEventByid($mainEventId);

        //TODO : create method in ACLHelper
        $entityClassName = $this->getClassNameFromShortClassName($entityLabel);

        //create a new entity
        $entity = new $entityClassName();
        $entity->setMainEvent($mainEvent);

        //perform acl check
        $right = "CREATE";
        if (false === $this->get("security.context")->isGranted($right, $entity))
        {
            throw new AccessDeniedException(
                sprintf('You don\'t have the authorization to perform %s on %s',
                    $right,
                    '#' . $entity->getId()
                )
            );
        }

        /** @var Importer $fieldConfig */
        $fieldConfig = null;
        $value = null;

        //TODO : secure this?
        $datas = $request->request->all();

        //TODO put this in a dedicated importService
        $return = $this->importEntities($datas, $entity, $header, $em);
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager
        //TODO put this in a dedicated importService in processImport() without entityManager

        if (count($return["errors"]) > 0)
        {
            $return["result"] = "error";
        }
        else
        {
            $em->flush();
            $return["result"] = "done";
        }

        return $return;
    }

    /**
     * get full class name from the short class name
     * ex : Role => fibe\\ContentBundle\\Entity\\Role
     *
     * @param $shortClassName
     * @return string
     * @throws \Exception
     */
    //TODO : put this in ACLHelper
    /**
     * shortcut to get mainEvent by id
     * @param $mainEventId
     * @return \fibe\EventBundle\Entity\MainEvent
     */
    protected function getMainEventByid($mainEventId)
    {
        /** @var EntityManagerInterface $em */
        $em = $this->get("doctrine.orm.entity_manager");

        return $em->getRepository("fibeEventBundle:MainEvent")->find($mainEventId);
    }


    protected function importEntities($datas, $entity, $header, EntityManagerInterface $em)
    {
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
                                (string) $fieldConfig,
                                $value);
                        }

                        $value = $linkedEntity;
                    }

                    //call the setter
                    $setter = "set" . ucwords($fieldConfig->propertyName);
                    $entityInstance->$setter($value);
                }

                $return["imported"]++;
                $em->persist($entityInstance);
            }
            catch (SympozerImportErrorException $ex)
            {
                $return["errors"][] = array(
                    "line"   => $ex->getLine(),
                    "column" => $ex->getColumn(),
                    "value"  => $ex->getValue(),
                    "msg"    => $ex->getMessage()
                );
            }
        }

        return $return;
    }
}
        