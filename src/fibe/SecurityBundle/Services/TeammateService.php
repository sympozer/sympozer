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

  function __construct(ACLEntityHelper $aclEntityHelper)
  {
    $this->aclEntityHelper = $aclEntityHelper;
  }

  public function post(Teammate $teammate)
  {
//    $person = $teammate->getPerson();
//    $ACLService = $this->get('fibe_security.acl_user_permission_helper');
//    $ACLService->updateTeammate($teammate);
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

