<?php

namespace fibe\EventBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Util\Codes;

/**
 * Category rest controller.
 */
class CategoryVersionRESTController extends FOSRestController
{

    const ENTITY_CLASSNAME = "fibe\\EventBundle\\Entity\\CategoryVersion";
    const FORM_CLASSNAME = "fibe\\EventBundle\\Form\\CategoryVersionType";


    /**
     * Lists all Category Versions entities filtered by conference.
     * @Rest\Get("/mainEvents/{mainEventId}/categoryVersions", name="schedule_category_versions_all_by_conference")
     * @Rest\View
     * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
     * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
     * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
     * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
     * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
     */
    public function getCategoryVersionsByConferenceAction(Request $request, ParamFetcherInterface $paramFetcher, $mainEventId)
    {
        $routeParams = [];
        $routeParams["mainEventId"] = $mainEventId;

        return $this->get('fibe.rest.crudhandler')->getAll(
            $this::ENTITY_CLASSNAME,
            $paramFetcher,
            $routeParams
        );
    }

    /**
     * Lists all Category entities.
     * @Rest\Get("/categoryVersions", name="schedule_category_versions_all")
     * @Rest\View
     * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
     * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
     * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
     * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
     * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
     */
    public function getCategoryVersionsAction(Request $request, ParamFetcherInterface $paramFetcher)
    {
        return $this->get('fibe.rest.crudhandler')->getAll(
            $this::ENTITY_CLASSNAME,
            $paramFetcher
        );

    }

    /**
     * @Rest\Get("/categoryVersions/{id}", name="schedule_category_versions_get")
     **/
    public function getCategoryVersionAction($id)
    {

        return $this->get('fibe.rest.crudhandler')->get(
            $this::ENTITY_CLASSNAME,
            $id
        );
    }


    /**
     * Creates a new Category Version from the submitted data.
     *
     * @Rest\Post("/categoryVersions", name="schedule_category_versions_post")
     *
     * @param Request $request the request object
     *
     * @return array|\FOS\RestBundle\View\View
     */
    public function postCategoryVersionAction(Request $request)
    {

        return $this->get('fibe.rest.crudhandler')->processForm(
            $request,
            $this::ENTITY_CLASSNAME,
            $this::FORM_CLASSNAME,
            'POST'
        );

    }


    /**
     * Put action
     * @Rest\Put("/categoryVersions/{id}", name="schedule_category_versions_put")
     * @var Request $request
     * @var integer $id Id of the entity
     * @return mixed
     */
    public function putCategoryVersionAction(Request $request, $id)
    {

        return $this->get('fibe.rest.crudhandler')->processForm(
            $request,
            $this::ENTITY_CLASSNAME,
            $this::FORM_CLASSNAME,
            'PUT', $id
        );

    }


    /**
     * Patch action
     * @Rest\Patch("/categoryVersions/{id}", name="schedule_category_versions_patch")
     * @var Request $request
     * @var integer $id Id of the entity
     * @return mixed
     */
    public function patchCategoryVersionAction(Request $request, $id)
    {
        return $this->get('fibe.rest.crudhandler')->processForm(
            $request,
            $this::ENTITY_CLASSNAME,
            $this::FORM_CLASSNAME,
            'PATCH', $id
        );
    }


    /**
     * Delete action
     * @Rest\Delete("/categoryVersions/{id}", name="schedule_category_versions_delete")
     *
     * @var integer $id Id of the entity
     */
    public function deleteCategoryVersionAction($id)
    {

        $this->get('fibe.rest.crudhandler')->delete(
            $this::ENTITY_CLASSNAME,
            $id
        );;
    }

}
        