<?php

namespace fibe\RestBundle\Handler;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException;
use Symfony\Component\HttpFoundation\Request;

class CrudHandler
{
    /** @var \Doctrine\ORM\EntityManager em */
    protected $em;
    protected $container;

    public function __construct(ContainerInterface $container )
    {
        $this->container      = $container;
        $this->em             = $container->get('doctrine.orm.entity_manager');
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

        if(null != $routeParams && null != $filters) {
            $filters = array_merge($filters, $routeParams);
        }
        return $this->container->get('fibe.rest.searchservice')->doSearch($entityClassName, $limit, $offset, $query, $order, $filters);
    }

    /**
     * Processes the form.
     * try to call a business service method having the same name the http method
     * the business service is conventionally named fibe.{entityNme}Service  (i.e. : fibe.mainEventService)
     *
     * @param string  $entityClassName
     * @param string  $formClassName
     * @param Request $request
     * @param String  $method
     * @param String  $id
     *
     * @return mixed  $entity|form validation errors
     */
    public function processForm(Request $request, $entityClassName, $formClassName, $method, $id = null)
    {
        //TODO secure with acl
        $formData = $request->request->all();
        if($id === null)
        {
            $entity = new $entityClassName();
        }
        else
        {
            $entity = $this->em->getRepository($entityClassName)->find($id);
        }
        $form = $this->container->get('form.factory')->create(new $formClassName(), $entity, array('method' => $method));
        //unset($formData['id']);//remove id to avoid form validation error with this unnecessary id
        //unset($formData['dtype']);
        $form->submit($formData, 'PATCH' !== $method);
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

    public function delete($entityClassName, $id)
    {
        $entity = $this->em->getRepository($entityClassName)->find($id);
        $this->callBusinessService($entity, $entityClassName, 'delete');
        $this->em->remove($entity);
        $this->em->flush($entity);
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
            if($entityService = $this->container->get('fibe.'.substr($entityClassName, strrpos($entityClassName,'\\') + 1).'Service'))
            {
                if(method_exists($entityService,strtolower($method)))
                {
                    call_user_func_array(array($entityService, strtolower($method)), array($entity, $entityClassName));
                }
            }
        }
        catch(ServiceNotFoundException $e)
        {
            //no business service defined, just do nothing
        }
    }
}
