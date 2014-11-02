<?php
namespace fibe\SecurityBundle\Services;

use Doctrine\ORM\EntityManager;
use fibe\RestBundle\Services\AbstractBusinessService;
use fibe\SecurityBundle\Entity\Teammate;

/**
 *
 * @author benoitddlp
 */
class TeammateService extends AbstractBusinessService
{
  protected $entityManager;

  public function __construct(EntityManager $entityManager)
  {
    $this->entityManager = $entityManager;
  }

  public function post(Teammate $teammate)
  {
    //TODO ; add acl
    return $teammate;
  }

  public function put(Teammate $teammate)
  {
    //TODO ; modify acl
    return $teammate;
  }

  public function patch(Teammate $teammate)
  {
    //TODO ; modify acl
    return $teammate;
  }
}

