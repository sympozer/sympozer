<?php
namespace fibe\SecurityBundle\Services;

use fibe\RestBundle\Services\AbstractBusinessService;
use fibe\SecurityBundle\Entity\Teammate;

/**
 *
 * @author benoitddlp
 */
class TeammateService extends AbstractBusinessService
{
  protected $aclEntityHelper;

  function __construct(ACLUserPermissionHelper $aclEntityHelper)
  {
    $this->aclEntityHelper = $aclEntityHelper;
  }

  public function post(Teammate $teammate)
  {
//    $this->aclEntityHelper->getPermissionForTeammate($teammate);
//    $this->aclEntityHelper->updateTeammate($teammate);
//
//    $this->entityManager->flush();

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

