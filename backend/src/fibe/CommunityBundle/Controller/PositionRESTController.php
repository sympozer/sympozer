<?php

namespace fibe\CommunityBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;


/**
 * Postiion controller.
 */
class PositionRESTController extends FOSRestController
{


    const ENTITY_CLASSNAME = "fibe\\CommunityBundle\\Entity\\Position";
    const FORM_CLASSNAME = "fibe\\CommunityBundle\\Form\\PositionType";



    /**
     * @Rest\Get("/positions/{id}", name="community_positions_get")
     **/
    public function getPositionAction($id)
    {

        return $this->get('fibe.rest.crudhandler')->get(
            $this::ENTITY_CLASSNAME,
            $id
        );
    }


    /**
     * Creates a new position from the submitted data.
     *
     * @Rest\Post("/positions",name="community_positions_post")
     *
     * @param Request $request the request object
     *
     * @return array|\FOS\RestBundle\View\View
     */
    public function postPositionAction(Request $request)
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
     * @Rest\Put("/positions/{id}", name="community_positions_put")
     * @var Request $request
     * @var integer $id Id of the entity
     * @return mixed
     */
    public function putPositionAction(Request $request, $id)
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
     * @Rest\Patch("/positions/{id}", name="community_positions_patch")
     * @var Request $request
     * @var integer $id Id of the entity
     * @return mixed
     */
    public function patchPositionAction(Request $request, $id)
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
     * @Rest\Delete("/positions/{id}", name="community_positions_delete")
     *
     * @var integer $id Id of the entity
     */
    public function deletePositionAction($id)
    {

        $this->get('fibe.rest.crudhandler')->delete(
            $this::ENTITY_CLASSNAME,
            $id
        );

    }

}
        