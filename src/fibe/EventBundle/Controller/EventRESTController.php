<?php

namespace fibe\EventBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;

use FOS\RestBundle\Controller\FOSRestController;

/**
 * Event rest controller.
 */
class EventRESTController extends FOSRestController
{

  const ENTITY_CLASSNAME = "fibe\\EventBundle\\Entity\\Event";
  const FORM_CLASSNAME = "fibe\\EventBundle\\Form\\EventType";


  /**
   * Lists all Event entities.
   * @Rest\Get("/events", name="schedule_events_all")
   * @Rest\View
   * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
   * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
   * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
   * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
   * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
   */
  public function getEventsAction(Request $request, ParamFetcherInterface $paramFetcher)
  {
    return $this->get('fibe.rest.crudhandler')->getAll(
      $this::ENTITY_CLASSNAME,
      $paramFetcher
    );

  }

  /**
   * Lists all Event entities filtered by conference.
   * @Rest\Get("/mainEvents/{mainEventId}/events", name="schedule_events_all_by_conference")
   * @Rest\View
   * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
   * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
   * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
   * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
   * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
   */
  public function getEventsByConferenceAction(Request $request, ParamFetcherInterface $paramFetcher, $mainEventId)
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
   * @Rest\Get("/events/{id}", name="schedule_events_get")
   **/
  public function getEventAction($id)
  {

    return $this->get('fibe.rest.crudhandler')->get(
      $this::ENTITY_CLASSNAME,
      $id
    );
  }


  /**
   * Creates a new Event from the submitted data.
   *
   * @Rest\Post("/events", name="schedule_events_post")
   *
   * @param Request $request the request object
   *
   * @return array|\FOS\RestBundle\View\View
   */
  public function postEventAction(Request $request)
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
   * @Rest\Put("/events/{id}", name="schedule_events_put")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   * @TODO Remove dtype from the serialization
   */
  public function putEventAction(Request $request, $id)
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
   * @Rest\Patch("/events/{id}", name="schedule_events_patch")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function patchEventAction(Request $request, $id)
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
   * @Rest\Delete("/events/{id}", name="schedule_events_delete")
   *
   * @var integer $id Id of the entity
   */
  public function deleteEventAction($id)
  {

    $this->get('fibe.rest.crudhandler')->delete(
      $this::ENTITY_CLASSNAME,
      $id
    );;
  }

}
        