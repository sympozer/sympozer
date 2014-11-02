<?php

namespace fibe\ContentBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\FOSRestController;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * RoleLabel rest controller.
 */
class RoleLabelVersionRESTController extends FOSRestController
{

    const ENTITY_CLASSNAME = "fibe\\ContentBundle\\Entity\\RoleLabelVersion";
    const FORM_CLASSNAME = "fibe\\ContentBundle\\Form\\RoleLabelVersionType";

    /**
     * Lists all Role Label versions entities filtered by conference.
     * @Rest\Get("/mainEvents/{mainEventId}/roleLabelVersions", name="content_roleLabel_versions_all_by_conference")
     * @Rest\View
     * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
     * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
     * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
     * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
     * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
     */
    public function getRoleLabelVersionsByConferenceAction(Request $request, ParamFetcherInterface $paramFetcher, $mainEventId)
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
     * Lists all RoleLabelVersions entities.
     * @Rest\Get("/roleLabelVersions", name="content_roleLabel_versions_all")
     * @Rest\View
     * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
     * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
     * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
     * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
     * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
     */
    public function getRoleLabelVersionsAction(Request $request, ParamFetcherInterface $paramFetcher)
    {
        return $this->get('fibe.rest.crudhandler')->getAll(
            $this::ENTITY_CLASSNAME,
            $paramFetcher
        );
    }

    /**
     * @Rest\Get("/roleLabelVersions/{id}", name="content_roleLabel_versions_get")
     **/
    public function getRoleLabelVersionAction($id)
    {

        return $this->get('fibe.rest.crudhandler')->get(
            $this::ENTITY_CLASSNAME,
            $id
        );
    }


    /**
     * Creates a new RoleLabelversion from the submitted data.
     *
     * @Rest\Post("/roleLabelVersions", name="content_roleLabel_versions_post")
     *
     * @param Request $request the request object
     *
     * @return array|\FOS\RestBundle\View\View
     */
    public function postRoleLabelVersionAction(Request $request)
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
     * @Rest\Put("/roleLabelVersions/{id}", name="content_roleLabel_versions_put")
     * @var Request $request
     * @var integer $id Id of the entity
     * @return mixed
     */
    public function putRoleLabelVersionAction(Request $request, $id)
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
     * @Rest\Patch("/roleLabelVersions/{id}", name="content_roleLabel_versions_patch")
     * @var Request $request
     * @var integer $id Id of the entity
     * @return mixed
     */
    public function patchRoleLabelVersionAction(Request $request, $id)
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
     * @Rest\Delete("/roleLabelVersions/{id}", name="content_roleLabel_versions_delete")
     *
     * @var integer $id Id of the entity
     */
    public function deleteRoleLabelVersionAction($id)
    {

        $this->get('fibe.rest.crudhandler')->delete(
            $this::ENTITY_CLASSNAME,
            $id
        );;
    }

}
        