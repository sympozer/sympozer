<?php

namespace fibe\EventBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * MainEventSettings rest controller.
 */
class MainEventSettingsRESTController extends FOSRestController
{

  const ENTITY_CLASSNAME = "fibe\\ContentBundle\\Entity\\MainEventSettings";
  const FORM_CLASSNAME = "fibe\\ContentBundle\\Form\\MainEventSettings";


  /**
   * Lists all MainEventSettings entities.
   * @Rest\Get("/mainEventSettings")
   * @Rest\View(serializerEnableMaxDepthChecks=true, serializerGroups={"list"})
   * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
   * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
   * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
   * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
   * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
   */
  public function getMainEventSettingssAction(Request $request, ParamFetcherInterface $paramFetcher)
  {
    return $this->get('fibe.rest.crudhandler')->getAll(
      $this::ENTITY_CLASSNAME,
      $paramFetcher
    );

  }

  /**
   * @Rest\Get("/mainEventSettings/{id}")
   * @Rest\View(serializerEnableMaxDepthChecks=true)
   **/
  public function getMainEventSettingsAction($id)
  {

    return $this->get('fibe.rest.crudhandler')->get(
      $this::ENTITY_CLASSNAME,
      $id
    );
  }


  /**
   * Creates a new MainEventSettings from the submitted data.
   *
   * @Rest\Post("/mainEventSettings",name="api_MainEventSettings_post")
   *
   * @param Request $request the request object
   *
   * @return array|\FOS\RestBundle\View\View
   */
  public function postMainEventSettingsAction(Request $request)
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
   * @Rest\Put("/mainEventSettings/{id}")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function putMainEventSettingsAction(Request $request, $id)
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
   * @Rest\Patch("/mainEventSettings/{id}")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function patchMainEventSettingsAction(Request $request, $id)
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
   * @Rest\Delete("/mainEventSettings/{id}")
   *
   * @var integer $id Id of the entity
   */
  public function deleteMainEventSettingsAction($id)
  {

    $this->get('fibe.rest.crudhandler')->delete(
      $this::ENTITY_CLASSNAME,
      $id
    );;
  }

}
        