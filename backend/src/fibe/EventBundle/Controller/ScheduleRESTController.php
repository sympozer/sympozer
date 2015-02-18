<?php

namespace fibe\EventBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Schedule rest controller.
 */
class ScheduleRESTController extends FOSRestController
{

  const ENTITY_CLASSNAME = "fibe\\ContentBundle\\Entity\\Schedule";
  const FORM_CLASSNAME = "fibe\\ContentBundle\\Form\\Schedule";


  /**
   * Lists all Schedule entities.
   * @Rest\Get("/schedules")
   * @Rest\View(serializerEnableMaxDepthChecks=true, serializerGroups={"list"})
   * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
   * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
   * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
   * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
   * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
   */
  public function getSchedulesAction(Request $request, ParamFetcherInterface $paramFetcher)
  {
    return $this->get('fibe.rest.crudhandler')->getAll(
      $this::ENTITY_CLASSNAME,
      $paramFetcher
    );

  }

  /**
   * @Rest\Get("/schedules/{id}")
   * @Rest\View(serializerEnableMaxDepthChecks=true)
   **/
  public function getScheduleAction($id)
  {

    return $this->get('fibe.rest.crudhandler')->get(
      $this::ENTITY_CLASSNAME,
      $id
    );
  }


  /**
   * Creates a new Schedule from the submitted data.
   *
   * @Rest\Post("/schedules",name="api_schedule_post")
   *
   * @param Request $request the request object
   *
   * @return array|\FOS\RestBundle\View\View
   */
  public function postScheduleAction(Request $request)
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
   * @Rest\Put("/schedules/{id}")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function putScheduleAction(Request $request, $id)
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
   * @Rest\Patch("/schedules/{id}")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function patchScheduleAction(Request $request, $id)
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
   * @Rest\Delete("/schedules/{id}")
   *
   * @var integer $id Id of the entity
   */
  public function deleteScheduleAction($id)
  {

    $this->get('fibe.rest.crudhandler')->delete(
      $this::ENTITY_CLASSNAME,
      $id
    );;
  }

}
        