<?php
namespace fibe\SecurityBundle\Services;

use fibe\RestBundle\Services\AbstractBusinessService;
use fibe\SecurityBundle\Entity\Teammate;
use fibe\SecurityBundle\Services\Acl\ACLUserPermissionHelper;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 *
 * @author benoitddlp
 */
class TeammateService extends AbstractBusinessService
{
    const DEFAULT_MASK = MaskBuilder::MASK_MASTER;
    protected $aclEntityHelper;
    protected $securityContext;

    function __construct(ACLUserPermissionHelper $aclEntityHelper, SecurityContextInterface $securityContext)
    {
        $this->aclEntityHelper = $aclEntityHelper;
        $this->securityContext = $securityContext;
    }

    public function post(Teammate $teammate)
    {
        if ($teammate->getTeam()->getMainEvent()->getOwner()->getId() == $teammate->getPerson()->getId())
        {
            throw new BadRequestHttpException("authentication.messages.cannot_add_owner_as_teammate");
        }
        $this->aclEntityHelper->performUpdateUserACL($teammate->getPerson()->getUser(), self::DEFAULT_MASK, $teammate->getTeam()->getMainEvent());

        return $teammate;
    }

    public function put(Teammate $teammate)
    {
        if ($teammate->getTeam()->getMainEvent()->getOwner()->getId() == $teammate->getPerson()->getId())
        {
            throw new BadRequestHttpException("authentication.messages.cannot_add_owner_as_teammate");
        }
        $this->aclEntityHelper->performUpdateUserACL($teammate->getPerson()->getUser(), self::DEFAULT_MASK, $teammate->getTeam()->getMainEvent());

        return $teammate;
    }

    public function patch(Teammate $teammate)
    {
        //TODO ; modify acl ?
        return $teammate;
    }

    public function delete(Teammate $teammate)
    {
        if ($this->securityContext->getToken()->getUser()->getPerson()->getId() == $teammate->getPerson()->getId())
        {
            throw new BadRequestHttpException("authentication.messages.cannot_demote_youself");
        }
        $this->aclEntityHelper->performDeleteUserACL($teammate->getPerson()->getUser(), $teammate->getTeam()->getMainEvent());

        return $teammate;
    }
}

