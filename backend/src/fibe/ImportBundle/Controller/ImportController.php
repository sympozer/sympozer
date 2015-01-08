<?php

namespace fibe\ImportBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ImportController extends FOSRestController
{

    const IMPORT_ALL = "all";
    const IMPORTER_ANNOTATION = 'fibe\\ContentBundle\\Annotation\\Importer';


    /**
     * controller used to expose url to ws-config
     * /!\ do not remove
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
        $header = $this->get('fibe_import.import_service')->getImportConfigFromShortClassName($entityLabel, true);

        return array(
            "header" => $header,
            "entity" => $entityLabel
        );
    }

    /**
     * Get a sample csv file to download.
     * The sample is got from Importer annotations for the given entity provided by $entityLabel
     *
     * @Rest\Get("/import/{entityLabel}-sample.csv", defaults={"entityLabel" = "all"})
     */
    public function getImportSampleAction(Request $request, $entityLabel)
    {
        //TODO put this in a dedicated importService
        $header = $this->get('fibe_import.import_service')->getImportConfigFromShortClassName($entityLabel, true);

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
     * Process received datas.
     *
     * The config is got from Importer annotations for the given entity provided by $entityLabel
     * and is used to parse input datas.
     *
     * @Rest\Post("/mainEvents/{mainEventId}/import/{entityLabel}", defaults={"entityLabel" = "all"})
     * @Rest\View
     */
    public function postImportAction(Request $request, $mainEventId, $entityLabel)
    {
        //TODO : secure this?
        $datas = $request->request->all();

        /** @var EntityManagerInterface $em */
        $em = $this->get("doctrine.orm.entity_manager");

        $mainEvent = $this->getMainEventByid($mainEventId);

        //TODO put this in a dedicated importService
        $return = $this->get('fibe_import.import_service')->importEntities($datas, $entityLabel, $mainEvent, $em);


        if (count($return["errors"]) > 0)
        {
            $return["result"] = "error";
        }
        else
        {
            foreach ($return - ['entities'] as $entity)
            {
                $em->persist($entity);
            }
            $em->flush();
            $return["result"] = "done";
        }

        return $return;
    }

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
}
