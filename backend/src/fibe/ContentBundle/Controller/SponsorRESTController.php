<?php

namespace fibe\ContentBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Sponsor rest controller.
 */
class SponsorRESTController extends FOSRestController
{

  const ENTITY_CLASSNAME = "fibe\\ContentBundle\\Entity\\Sponsor";
  const FORM_CLASSNAME = "fibe\\ContentBundle\\Form\\Sponsor";


  /**
   * Lists all Sponsor entities.
   * @Rest\Get("/sponsors")
   * @Rest\View(serializerEnableMaxDepthChecks=true, serializerGroups={"list"})
   * @Rest\QueryParam(name="offset", requirements="\d+", nullable=true, description="Offset from which to start listing pages.")
   * @Rest\QueryParam(name="limit", requirements="\d+", default="10", description="How many entity to return.")
   * @Rest\QueryParam(name="query", requirements=".{1,128}", nullable=true, description="the query to search.")
   * @Rest\QueryParam(name="order", nullable=true, array=true, description="an array of order.")
   * @Rest\QueryParam(name="filters", nullable=true, array=true, description="an array of filters.")
   */
  public function getSponsorsAction(Request $request, ParamFetcherInterface $paramFetcher)
  {
    return $this->get('fibe.rest.crudhandler')->getAll(
      $this::ENTITY_CLASSNAME,
      $paramFetcher
    );

  }

  /**
   * @Rest\Get("/sponsors/{id}")
   * @Rest\View(serializerEnableMaxDepthChecks=true)
   **/
  public function getSponsorAction($id)
  {

    return $this->get('fibe.rest.crudhandler')->get(
      $this::ENTITY_CLASSNAME,
      $id
    );
  }


  /**
   * Creates a new Sponsor from the submitted data.
   *
   * @Rest\Post("/sponsors",name="api_sponsor_post")
   *
   * @param Request $request the request object
   *
   * @return array|\FOS\RestBundle\View\View
   */
  public function postSponsorAction(Request $request)
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
   * @Rest\Put("/sponsors/{id}")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function putSponsorAction(Request $request, $id)
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
   * @Rest\Patch("/sponsors/{id}")
   * @var Request $request
   * @var integer $id Id of the entity
   * @return mixed
   */
  public function patchSponsorAction(Request $request, $id)
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
   * @Rest\Delete("/sponsors/{id}")
   *
   * @var integer $id Id of the entity
   */
  public function deleteSponsorAction($id)
  {

    $this->get('fibe.rest.crudhandler')->delete(
      $this::ENTITY_CLASSNAME,
      $id
    );;
  }

}
        