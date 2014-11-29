<?php

namespace fibe\ContentBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;


use FOS\RestBundle\Controller\FOSRestController;


/**
 * Location rest controller.
 */
class LocationRESTController extends FOSRestController
{

    const ENTITY_CLASSNAME = "fibe\\ContentBundle\\Entity\\Location";
    const FORM_CLASSNAME = "fibe\\ContentBundle\\Form\\LocationType";


    /**
     * Lists all Locations entities.
     * @Rest\Get("/mainEvents/{mainEventId}/locations",name="content_locations_all_by_conference")
     * @Rest\View
     * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
     * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
     * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
     * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
     * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
     */
    public function getLocationsByConferenceAction(Request $request, ParamFetcherInterface $paramFetcher, $mainEventId)
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
     * Lists all MainEventLocation entities.
     * @Rest\Get("/locations",name="content_locations_all")
     * @Rest\View
     * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
     * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
     * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
     * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
     * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
     */
    public function getLocationsAction(Request $request, ParamFetcherInterface $paramFetcher)
    {
        return $this->get('fibe.rest.crudhandler')->getAll(
            $this::ENTITY_CLASSNAME,
            $paramFetcher
        );
    }

    /**
     * @Rest\Get("/locations/{id}",name="content_locations_get")
     **/
    public function getLocationAction($id)
    {

        return $this->get('fibe.rest.crudhandler')->get(
            $this::ENTITY_CLASSNAME,
            $id
        );
    }


    /**
     * Creates a new MainEventLocation from the submitted data.
     *
     * @Rest\Post("/locations",name="content_locations_post")
     *
     * @param Request $request the request object
     *
     * @return array|\FOS\RestBundle\View\View
     */
    public function postLocationAction(Request $request)
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
     * @Rest\Put("/locations/{id}",name="content_locations_put")
     * @var Request $request
     * @var integer $id Id of the entity
     * @return mixed
     */
    public function putLocationAction(Request $request, $id)
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
     * @Rest\Patch("/locations/{id}",name="content_locations_patch")
     * @var Request $request
     * @var integer $id Id of the entity
     * @return mixed
     */
    public function patchLocationAction(Request $request, $id)
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
     * @Rest\Delete("/locations/{id}",name="content_locations_delete")
     *
     * @var integer $id Id of the entity
     */
    public function deleteLocationAction($id)
    {

        $this->get('fibe.rest.crudhandler')->delete(
            $this::ENTITY_CLASSNAME,
            $id
        );
    }

}
        