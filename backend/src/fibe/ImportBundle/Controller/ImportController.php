<?php

namespace fibe\ImportBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ImportController extends FOSRestController
{

    const IMPORT_ALL = "all";
    const IMPORTER_ANNOTATION = 'fibe\\ContentBundle\\Annotation\\Importer';

    const CSV_DELIMITER = ";";

    //return results label
    const IMPORT_ERROR = "error";
    const IMPORT_DONE_COMMIT = "done(commit)";
    const IMPORT_DONE_ROLLBACK = "done(rollback)";


    /**
     * controller used to expose url to ws-config
     * /!\ do not remove
     *
     * @Rest\Get("/import", name="content_import_get_header")
     * @Rest\View
     */
    public function importAction(Request $request)
    {
    }

    /**
     * Get a sample csv file to download.
     * The sample is got from Importer annotations for the given entity provided by $entityLabel
     *
     * comment first line by adding a #
     *
     * @Rest\Get("/import/{entityLabel}-sample.csv", defaults={"entityLabel" = "all"})
     */
    public function getImportSampleAction(Request $request, $entityLabel)
    {
        $header = $this->get('fibe_import.import_config_service')->fromShortClassName($entityLabel, true);

        $handle = fopen('php://memory', 'r+');

        if ($entityLabel == "all")
        {
            foreach ($header as $entityHeader)
            {
                $entityHeader[0] = "#" . $entityHeader[0];
                fputcsv($handle, $entityHeader, self::CSV_DELIMITER);
            }
        }
        else
        {
            $header[0] = "#" . $header[0];
            fputcsv($handle, $header, self::CSV_DELIMITER);
        }
        rewind($handle);
        $content = stream_get_contents($handle);
        fclose($handle);

        return new Response($content, 200, array(
            'Content-Type' => 'application/force-download',
            'Content-Disposition' => 'attachment; filename="import-' . strtolower($entityLabel) . '-sample.csv"'
        ));
    }

    /**
     * Get import config in json.
     * The config is got from Importer annotations for the given entity provided by $entityLabel
     * @Rest\Get("/import/{entityLabel}", defaults={"entityLabel" = "all"})
     * @Rest\View
     */
    public function getImportHeaderAction(Request $request, $entityLabel)
    {
        $header = $this->get('fibe_import.import_config_service')->fromShortClassName($entityLabel, true);

        return array(
            "header" => $header,
            "entity" => $entityLabel
        );
    }

    /**
     * Process received datas.
     *
     * The config is got from Importer annotations for the given entity provided by $entityLabel
     * and is used to parse input datas.
     *
     * @Rest\Post("/mainEvents/{mainEventId}/import/{entityLabel}", defaults={"entityLabel" = "all"})
     * @Rest\Get("/mainEvents/{mainEventId}/import/{entityLabel}", defaults={"entityLabel" = "all"})
     * @Rest\View(serializerEnableMaxDepthChecks=true, serializerGroups={"list"})
     * @Rest\QueryParam(name="commit", requirements="true|false", default="false", description="How many entity to return.")
     */
    public function postImportAction(Request $request, ParamFetcherInterface $paramFetcher, $mainEventId, $entityLabel)
    {
        //TODO : secure this?
        $datas = $request->request->all();

        /** @var EntityManagerInterface $em */
        $em = $this->get("doctrine.orm.entity_manager");

        $mainEvent = $this->getMainEventByid($mainEventId);
        $setMainEventSetter = 'setMainEvent';

        $return = $this->get('fibe_import.import_service')->importEntities($datas, $mainEvent, $entityLabel);

        if (count($return["errors"]) > 0)
        {
            unset($return['entities']);
            $return["result"] = self::IMPORT_ERROR;
        }
        else if ($paramFetcher->get('commit') == "true")
        {
            foreach ($return['entities'] as $entity)
            {
                if (method_exists($entity, '$setMainEventSetter'))
                {
                    $entity->$setMainEventSetter($mainEvent);
                }
                $em->persist($entity);
            }
            $em->flush();
            $return["result"] = self::IMPORT_DONE_COMMIT;
        }
        else
        {
            unset($return['entities']);
            $return["result"] = self::IMPORT_DONE_ROLLBACK;
        }

        return $return;
    }

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
