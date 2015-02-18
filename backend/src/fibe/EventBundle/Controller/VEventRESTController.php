<?php

namespace fibe\EventBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * VEvent rest controller.
 */
class VEventRESTController extends FOSRestController
{

  const ENTITY_CLASSNAME = "fibe\\ContentBundle\\Entity\\VEvent";
  const FORM_CLASSNAME = "fibe\\ContentBundle\\Form\\VEventType";


  /**
   * Lists all VEvent entities.
   * @Rest\Get("VEvents")
   * @Rest\View(serializerEnableMaxDepthChecks=true, serializerGroups={"list"})
   * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
   * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
   * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
   * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
   * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
   */
  public function getVEventsAction(Request $request, ParamFetcherInterface $paramFetcher)
  {
    return $this->get('fibe.rest.crudhandler')->getAll(
      $this::ENTITY_CLASSNAME,
      $paramFetcher
    );

  }

  /**
   * @Rest\Get("/VEvents/{id}")
   * @Rest\View(serializerEnableMaxDepthChecks=true)
   **/
  public function getVEventAction($id)
  {

    return $this->get('fibe.rest.crudhandler')->get(
      $this::ENTITY_CLASSNAME,
      $id
    );
  }


  /**
   * Creates a new VEvent from the submitted data.
   *
   * @Rest\Post("/VEvents",name="api_VEvent_post")
   *
   * @param Request $request the request object
   *
   * @return array|\FOS\RestBundle\View\View
   */
  public function postVEventAction(Request $request)
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
   * @Rest\Put("/VEvents/{id}")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function putVEventAction(Request $request, $id)
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
   * @Rest\Patch("/VEvents/{id}")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function patchVEventAction(Request $request, $id)
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
   * @Rest\Delete("/VEvents/{id}")
   *
   * @var integer $id Id of the entity
   */
  public function deleteVEventAction($id)
  {

    $this->get('fibe.rest.crudhandler')->delete(
      $this::ENTITY_CLASSNAME,
      $id
    );;
  }

}
        