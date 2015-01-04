<?php

namespace fibe\ContentBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
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

    /**
     * controller used export url
     * @Rest\Get("/import", name="content_import_get_header")
     * @Rest\View
     */
    public function importAction(Request $request, $shortClassName)
    {
    }

    /**
     * @Rest\Get("/import/{entityLabel}-sample.csv")
     */
    public function getImportSampleAction(Request $request, $entityLabel)
    {
        $header = $this->getHeaderFromShortClassName($entityLabel, true);

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
     * @param $shortClassName
     * @param bool $asString
     * @throws \Exception if $shortClassName
     * @return array
     */
    protected function getHeaderFromShortClassName($shortClassName, $asString = false)
    {
        $importFields = [];

        $importerAnnotationClass = 'fibe\\ContentBundle\\Annotation\\Importer';

        $reader = $this->get("annotations.reader");
        $entityClassName = $this->getClassNameFromShortClassName($shortClassName);
        $reflectionObject = new \ReflectionObject(new $entityClassName());

        foreach ($reflectionObject->getProperties() as $reflectionProperty)
        {
            /** @var \fibe\ContentBundle\Annotation\Importer $annotation */
            $annotation = $reader->getPropertyAnnotation($reflectionProperty, $importerAnnotationClass);
            if (null !== $annotation)
            {
                //TODO : build a real object, its toString method and its interface!
                if ($asString)
                {
                    $fieldName = sprintf("%s(%s)",
                        $reflectionProperty->getName(),
                        $annotation->uniqField
                    );
                }
                else
                {
                    $fieldName = array(
                        "field"           => $reflectionProperty->getName(),
                        "uniqField"       => $annotation->uniqField,
                        "entityClassName" => $annotation->entity,
                    );
                }
                $importFields[] = $fieldName;
            }
        }

        return $importFields;
    }

    //TODO : create method in ACLHelper

    protected function getClassNameFromShortClassName($shortClassName)
    {
        if (isset(ACLHelper::$ACLEntityNameArray[$shortClassName]))
        {
            return ACLHelper::$ACLEntityNameArray[$shortClassName]["classpath"] . "\\" . $shortClassName;
        }
        throw new \Exception("$shortClassName' is not configured to be imported");
    }

    /**
     * @Rest\Get("/import/{entityLabel}")
     * @Rest\View
     */
    public function getImportHeaderAction(Request $request, $entityLabel)
    {
        $header = $this->getHeaderFromShortClassName($entityLabel, true);

        return array(
            "header" => $header,
            "entity" => $entityLabel
        );
    }

    /**
     * @Rest\Post("/mainEvents/{mainEventId}/import/{entityLabel}")
     * @Rest\View
     */
    public function postImportAction(Request $request, $mainEventId, $entityLabel)
    {
        $header = $this->getHeaderFromShortClassName($entityLabel);
        //TODO : secure this!
        $datas = $request->request->all();
        /** @var EntityManagerInterface $em */
        $em = $this->get("doctrine.orm.entity_manager");
        $mainEvent = $this->getMainEventByid($mainEventId);

        //TODO : create method in ACLHelper
        $entityClassName = $this->getClassNameFromShortClassName($entityLabel);

        $entity = new $entityClassName();
        $entity->setMainEvent($mainEvent);

        //perform acl check
        $right = "CREATE";
        if (false === $this->container->get("security.context")->isGranted($right, $entity))
        {
            throw new AccessDeniedException(
                sprintf('You don\'t have the authorization to perform %s on %s',
                    $right,
                    '#' . $entity->getId()
                )
            );
        }

        $return = array("errors" => array());

        for ($i = 0; $i < count($datas); $i++)
        {
            $row = $datas[$i];

            $entityInstance = clone $entity;

            for ($j = 0; $j < count($header); $j++)
            {
                $value = $row[$j];

                $field = $header[$j]["field"];
                $uniqField = $header[$j]["uniqField"];

//                echo "\n$field => $value";


                //its a linked entity!
                if (!empty($header[$j]["entityClassName"]))
                {
                    $linkedEntityClassName = $header[$j]["entityClassName"];

                    //create the linked entity
//                    $linkedEntity = new $linkedEntityClassName();
//                    $setter = "set" . ucwords($uniqField);
//                    $linkedEntity->$setter($value);

                    //get the linked entity
                    $linkedEntity = $em->getRepository($linkedEntityClassName)->findOneBy(array($uniqField => $value));

                    $value = $linkedEntity;
                }

                $setter = "set" . ucwords($field);
                $entityInstance->$setter($value);
            }
            $em->persist($entityInstance);
        }
        $em->flush();

        $return["result"] = "done";

        return $return;
    }

    protected function getMainEventByid($mainEventId)
    {
        /** @var EntityManagerInterface $em */
        $em = $this->get("doctrine.orm.entity_manager");

        return $em->getRepository("fibeEventBundle:MainEvent")->find($mainEventId);
    }
}
        