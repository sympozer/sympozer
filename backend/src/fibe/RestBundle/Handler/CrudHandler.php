<?php

namespace fibe\RestBundle\Handler;

use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

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

        if (!empty($routeParams))
        {
            $filters = null === $filters ? $routeParams : array_merge($filters, $routeParams);
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
            //the entity id must be on the url and not on the entity
            unset($formData['id']);
        }
        else
        {
            $entity = $this->em->getRepository($entityClassName)->find($id);
        }

        $form = $this->container->get("form.factory")->create(new $formClassName(), $entity, array('method' => $method));
        $form->submit($formData, 'PATCH' !== $method);

        //perform acl check
         //$this->validateAction($method, $entity);

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

    protected function validateAction($method, $entity)
    {
        if (!$entity)
        {
            throw new NotFoundHttpException("entity not found");
        }
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
        if (false === $this->container->get("security.context")->isGranted($right, $entity))
        {
            throw new AccessDeniedException(
                sprintf('You don\'t have the authorization to perform %s on %s',
                    $right,
                    '#' . $entity->getId()
                )
            );
        }
    }

}
