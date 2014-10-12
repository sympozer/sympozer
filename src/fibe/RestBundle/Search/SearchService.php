<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Search;

use Doctrine\Common\Annotations\Reader;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Query\Expr\OrderBy;

class SearchService implements SearchServiceInterface
{
    private $em;
    private $reader;

    private $annotationClass = 'Doctrine\\ORM\\Mapping\\Column';

    /**
     * @var array of classname having a case sensitive sql collation that need to be ignored
     */
    private $forceCIon = array('fibe\\ContentBundle\\Entity\\Topic');

    public function __construct(EntityManager $em,Reader $reader)
    {
        $this->reader = $reader;
        $this->em = $em;
    }

    /**
     * {@inheritdoc}
     */
    public function doSearch($entityClassName, $limit, $offset, $query = null, $orders = null, $filters = null)
    {
        $searchFields = $this->getSearchFields($entityClassName);
        $entityRepository = $this->em->getRepository($entityClassName);
        $qb = $entityRepository->createQueryBuilder('qb')  //add select and array for JSON
        ->setMaxResults($limit)
            ->setFirstResult($offset);

        //Add filter from input query
        if($query != null) {

            $forceCI = in_array($entityClassName, $this->forceCIon);
            foreach ($searchFields as $searchField) {
                if ($forceCI) {
                    $qb->orWhere('UPPER(qb.' . $searchField . ') LIKE UPPER(:string)');
                } else {
                    $qb->orWhere('qb.' . $searchField . ' LIKE :string');
                }
                $qb->setParameter('string', '%' . $query . '%');
            }
        }

        //Filter by main event
        if($filters != null) {
            $qb = $entityRepository->filter($qb, $filters);
        }

        //Build order by
        if(count($orders) > 0)
        {
            foreach($orders as $field => $order)
            {
                $qb->addOrderBy('qb.'.$field,$order);
            }
        }


        return $qb->getQuery()->getResult();
    }

    /**
     * @param string $entityClassName
     * @return array
     */
    protected function getSearchFields($entityClassName)
    {
        $searchFields = [];
        $reflectionObject = new \ReflectionObject(new $entityClassName());

        foreach ($reflectionObject->getProperties() as $reflectionProperty) {
            $annotation = $this->reader->getPropertyAnnotation($reflectionProperty, $this->annotationClass);
            if (null !== $annotation && $annotation->type == 'string') {
                $fieldName = $annotation->name ? $annotation->name : $reflectionProperty->getName();
                $searchFields[] = $fieldName;
            }
        }
        return $searchFields;
    }


}