<?php

namespace fibe\RestBundle\Handler;

use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException;
use Symfony\Component\HttpFoundation\Request;

class CrudHandler
{
  protected $em;
  protected $container;

  public function __construct(ContainerInterface $container)
  {
    /** @var EntityManagerInterface $em */
    $em = $container->get('doctrine.orm.entity_manager');
    $this->em = $em;
    $this->container = $container;
  }

  /**
   * @param string $entityClassName
   * @param string $id
   * @return mixed Entity
   */
  public function get($entityClassName, $id)
  {
    return $this->em->getRepository($entityClassName)->find($id);
  }

  /**
   * @param string $entityClassName
   * @param ParamFetcherInterface $paramFetcher
   * @param array $routeParams parameters from the route url
   * @return array of Entities
   */
  public function getAll($entityClassName, ParamFetcherInterface $paramFetcher, $routeParams = null)
  {
    $offset = $paramFetcher->get('offset');
    $limit = $paramFetcher->get('limit');
    $order = $paramFetcher->get('order');
    $query = $paramFetcher->get('query');
    $filters = $paramFetcher->get('filters');

    if (null != $routeParams && null != $filters)
    {
      $filters = array_merge($filters, $routeParams);
    }
    return $this->container->get("fibe.rest.searchservice")->doSearch($entityClassName, $limit, $offset, $query, $order, $filters);
  }

  /**
   * Processes the form.
   * try to call a business service method having the same name the http method
   * the business service is conventionally named fibe.{entityNme}Service  (i.e. : fibe.mainEventService)
   *
   * @param Request $request
   * @param string $entityClassName
   * @param string $formClassName
   * @param String $method
   * @param String $id
   *
   * @throws \RuntimeException in case the http method is not mapped
   * @return mixed  $entity|form validation errors
   */
  public function processForm(Request $request, $entityClassName, $formClassName, $method, $id = null)
  {
    $formData = $request->request->all();
    if ($id === null)
    {
      $entity = new $entityClassName();
    }
    else
    {
      $entity = $this->em->getRepository($entityClassName)->find($id);
    }

    $form = $this->container->get("form.factory")->create(new $formClassName(), $entity, array('method' => $method));
    //unset($formData['id']);//remove id to avoid form validation error with this unnecessary id
    //unset($formData['dtype']);
    $form->submit($formData, 'PATCH' !== $method);
    $this->validateAction($method, $entity);


    if ($form->isValid())
    {
      $entity = $form->getData();
      $this->callBusinessService($entity, $entityClassName, $method);
      $this->em->persist($entity);
      $this->em->flush($entity);
      return $entity;
    }

    return array(
      'form' => $form,
    );
  }

  protected function validateAction($method, $entity)
  {
    switch ($method)
    {
      case "PUT":
      case "PATCH":
        $right = "EDIT";
        break;
      case "POST":
        $right = "CREATE";
        break;
      case "DELETE":
        $right = "DELETE";
        break;
      default:
        throw new \RuntimeException("method : $method is not mapped in CrudHandler!");
    }
    //perform acl check
    $entity = $this->container->get("fibe_security.acl_entity_helper")->getEntityACL($right, $entity);
  }

  /**
   * get the service of the entity conventionally named fibe.{entityName}Service
   * @param $entity
   * @param $entityClassName
   * @param $method
   */
  protected function callBusinessService($entity, $entityClassName, $method)
  {
    try
    {
      if ($entityService = $this->container->get('fibe.' . substr($entityClassName, strrpos($entityClassName, '\\') + 1) . 'Service'))
      {
        if (method_exists($entityService, strtolower($method)))
        {
          call_user_func_array(array($entityService, strtolower($method)), array($entity, $entityClassName));
        }
      }
    } catch (ServiceNotFoundException $e)
    {
      //no business service defined, just do nothing
    }
  }

  public function delete($entityClassName, $id)
  {
    $entity = $this->em->getRepository($entityClassName)->find($id);
    $this->validateAction("DELETE", $entity);
    $this->callBusinessService($entity, $entityClassName, 'delete');
    $this->em->remove($entity);
    $this->em->flush($entity);
  }
}
