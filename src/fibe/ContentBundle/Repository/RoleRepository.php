<?php

namespace fibe\ContentBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

/**
 * RoleRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RoleRepository extends EntityRepository
{
  /**
   * filtering by main event
   * @param QueryBuilder $qb : query builder to add the filter to
   * @param $MainEventId : the main event to filter on
   * @return QueryBuilder $qb : modified query builder
   */
  public function findAllByMainEventId(QueryBuilder $qb, $MainEventId)
  {
    if (isset($MainEventId))
    {
      $qb->andWhere('qb.mainEvent = (:MainEventId)');
      $qb->setParameter('MainEventId', $MainEventId);
    }
    return $qb;
  }

  /**
   * filtering with all parameters difned
   * @param QueryBuilder $qb : query builder to add the filter to
   * @param array $params : the field to filter on
   * @return QueryBuilder $qb : modified query builder
   */
  public function filter(QueryBuilder $qb, $params)
  {
    if (isset($params['mainEventId']))
    {
      $qb->andWhere('qb.mainEvent = :mainEventId');
      $qb->setParameter('mainEventId', $params['mainEventId']);
    }

    if (isset($params['id']))
    {
      $qb
        ->andWhere('qb.id = :id')
        ->setParameter('id', $params['id']);
    }

    if (isset($params['roleLabelVersionId']))
    {
      $qb
        ->andWhere('qb.roleLabelVersion = :roleLabelVersionId')
        ->setParameter('roleLabelVersionId', $params['roleLabelVersionId']);
    }

    return $qb;
  }
}
