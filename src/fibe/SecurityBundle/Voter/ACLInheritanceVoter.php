<?php

namespace fibe\SecurityBundle\Voter;

use ErrorException;
use fibe\CommunityBundle\Entity\Person;
use fibe\EventBundle\Entity\MainEvent;
use fibe\SecurityBundle\Services\Acl\ACLHelper;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\Log\LoggerInterface;
use Symfony\Component\Security\Acl\Exception\AclNotFoundException;
use Symfony\Component\Security\Acl\Exception\NoAceFoundException;
use Symfony\Component\Security\Acl\Model\AclProviderInterface;
use Symfony\Component\Security\Acl\Model\ObjectIdentityInterface;
use Symfony\Component\Security\Acl\Model\ObjectIdentityRetrievalStrategyInterface;
use Symfony\Component\Security\Acl\Model\SecurityIdentityRetrievalStrategyInterface;
use Symfony\Component\Security\Acl\Permission\PermissionMapInterface;
use Symfony\Component\Security\Core\Authentication\Token\AnonymousToken;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\Exception\InvalidArgumentException;

/**
 * Class ACLInheritanceVoter
 * @see AclVoter
 * @package fibe\SecurityBundle\Voter
 */
class ACLInheritanceVoter implements VoterInterface
{
  private $aclProvider;
  private $permissionMap;
  private $objectIdentityRetrievalStrategy;
  private $securityIdentityRetrievalStrategy;
  private $logger;

  public function __construct(AclProviderInterface $aclProvider, ObjectIdentityRetrievalStrategyInterface $oidRetrievalStrategy, SecurityIdentityRetrievalStrategyInterface $sidRetrievalStrategy, PermissionMapInterface $permissionMap, LoggerInterface $logger = null)
  {
    $this->aclProvider = $aclProvider;
    $this->permissionMap = $permissionMap;
    $this->objectIdentityRetrievalStrategy = $oidRetrievalStrategy;
    $this->securityIdentityRetrievalStrategy = $sidRetrievalStrategy;
    $this->logger = $logger;
  }

  public function vote(TokenInterface $token, $entity, array $attributes)
  {
    // check if class of this object is supported by this voter
    if (!$this->supportsClass(get_class($entity)))
    {
      return self::ACCESS_ABSTAIN;
    }

    // only one arg
    if (1 !== count($attributes))
    {
      throw new InvalidArgumentException(
        '[ACLInheritanceVoter] Only one attribute is allowed for is_granted()'
      );
    }
    if ($token instanceof AnonymousToken)
    {
      throw new UnauthorizedHttpException('negotiate', 'You must be logged in');
    }
    // check if action is valid
    $mask = $this->supportsAttribute($attribute = $attributes[0]);

    if (!$mask)
    {
      throw new InvalidArgumentException(
        sprintf('[ACLInheritanceVoter] Invalid action %s for isGranted().', $attribute)
      );
    }

    //grant access to a main event creation
    if ($entity instanceof MainEvent && $attribute == "CREATE")
    {
      $this->log('[ACLInheritanceVoter][GRANT] Granting access to create a new conference.');
      return self::ACCESS_GRANTED;
    }

    //grant access to a person creation
    if ($entity instanceof Person && $attribute == "CREATE")
    {
      $this->log('[ACLInheritanceVoter][GRANT] Granting access to create a new person.');
      return self::ACCESS_GRANTED;
    }
    $this->log(sprintf('[ACLInheritanceVoter]voting for action => %s on entity => %s', $attribute, get_class($entity)));

    $sids = $this->securityIdentityRetrievalStrategy->getSecurityIdentities($token);
    return $this->isGranted($sids, $mask, $entity);
  }

  public function supportsClass($class)
  {
    try
    {
      return ACLHelper::isManaged($class);
    } catch (\RunTimeException $e)
    {
      return false;
    }
  }

  public function supportsAttribute($attribute)
  {
    return $this->permissionMap->getMasks((string) $attribute, null);
  }

  private function log($message)
  {
    if (null !== $this->logger)
    {
      $this->logger->info($message);
    }
  }

  private function isGranted($sids, $mask, $entity)
  {
    // check if class of this object is supported by this voter
    if (!$this->supportsClass(get_class($entity)))
    {
      return self::ACCESS_ABSTAIN;
    }
    //get entity oid / deny if incorrect
    if ($entity instanceof ObjectIdentityInterface)
    {
      $oid = $entity;
//      $this->log('[ACLInheritanceVoter] $entity instanceof ObjectIdentityInterface.');
    }
    else
    {
      $oid = $this->objectIdentityRetrievalStrategy->getObjectIdentity($entity);
//      $this->log(sprintf('[ACLInheritanceVoter] $entity instanceof ObjectIdentityInterface.'));
    }

    try
    {
      $acl = $this->aclProvider->findAcl($oid, $sids);
      if ($acl->isGranted($mask, $sids))
      {
        $this->log(sprintf('[ACLInheritanceVoter][GRANT] ACL found, permission granted on %s.', get_class($entity)));
        return self::ACCESS_GRANTED;
      }
      $this->log('[ACLInheritanceVoter][DENY] ACL found, permission denied.');
      return self::ACCESS_DENIED;
    } catch (\Exception $e)
    {
      //other exception than acl/ace not found
      if (!($e instanceof AclNotFoundException || $e instanceof NoAceFoundException || $e instanceof ErrorException))
      {
        throw $e;
      }
      //check parent if no permission on child
      if (null !== $parent = ACLHelper::getParent($entity))
      {
        $this->log(sprintf('[ACLInheritanceVoter] ACL not found, looking for parent : %s', get_class($parent)));
        return $this->isGranted($sids, $mask, $parent);
      }
//      $ACLEntityInfo = $this->supportsClass(get_class($entity));
//      if ($ACLEntityInfo && isset($ACLEntityInfo['parent']))
//      {
//        $parent = call_user_func_array(array($entity, $ACLEntityInfo['parent']), array());
//        $this->log(sprintf('[ACLInheritanceVoter] ACL not found, looking for parent : %s', get_class($parent)));
//        return $this->isGranted($sids, $mask, $parent);
//      }
      //no more parent
      $this->log(sprintf('[ACLInheritanceVoter][DENY] ACL not found, no more parent, permission denied for %s.', get_class($entity)));
      return self::ACCESS_DENIED;
    }
  }
}