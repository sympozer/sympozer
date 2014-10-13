<?php

namespace fibe\EventBundle\Repository;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use fibe\EventBundle\Entity\Category;

/**
 * CategoryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CategoryVersionRepository extends EntityRepository
{
    /**
     * filtering with all parameters defined
     * @param $qb , query builder to add the filter to
     * @param $params , the field to filter on
     * @return $qb, modified query builder
     */
    public function filter($qb, $params)
    {
        if (isset($params['mainEventId'])) {
            $qb->andWhere('qb.mainEvent = :mainEventId');
            $qb->setParameter('mainEventId', $params['mainEventId']);
        }

        return $qb;
    }
}
