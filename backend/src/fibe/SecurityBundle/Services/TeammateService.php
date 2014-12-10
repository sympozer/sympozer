<?php
namespace fibe\SecurityBundle\Services;

use fibe\RestBundle\Services\AbstractBusinessService;
use fibe\SecurityBundle\Entity\Teammate;
use fibe\SecurityBundle\Services\Acl\ACLUserPermissionHelper;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;

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
    if ($teammate->getPerson()->getId() == $teammate->getTeam()->getMainEvent()->getOwner()->getId())
    {
      throw new BadRequestHttpException("authentication.messages.cannot_add_owner_as_teammate");
    }
    $this->aclEntityHelper->performUpdateUserACL($teammate->getPerson()->getUser(), MaskBuilder::MASK_MASTER, $teammate->getTeam()->getMainEvent());

    return $teammate;
  }

  public function put(Teammate $teammate)
  {
    $this->aclEntityHelper->performUpdateUserACL($teammate->getPerson()->getUser(), MaskBuilder::MASK_MASTER, $teammate->getTeam()->getMainEvent());
    return $teammate;
  }

  public function patch(Teammate $teammate)
  {
    //TODO ; modify acl
    return $teammate;
  }

  public function delete(Teammate $teammate)
  {
    $this->aclEntityHelper->performDeleteUserACL($teammate->getPerson()->getUser(), $teammate->getTeam()->getMainEvent());
    return $teammate;
  }
}

