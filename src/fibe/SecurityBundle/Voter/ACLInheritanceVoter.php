<?php

namespace fibe\SecurityBundle\Voter;

use ErrorException;
use fibe\EventBundle\Entity\MainEvent;
use fibe\SecurityBundle\Services\ACLHelper;
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
      if (null !== $this->logger)
      {
        $this->logger->info(sprintf('[ACLInheritanceVoter][GRANT] Granting access to create a new conference.'));
      }
      return self::ACCESS_GRANTED;
    }
    if (null !== $this->logger)
    {
      $this->logger->info(sprintf('[ACLInheritanceVoter]voting for action => %s on entity => %s', $attribute, get_class($entity)));
    }
    $sids = $this->securityIdentityRetrievalStrategy->getSecurityIdentities($token);
    return $this->isGranted($sids, $mask, $entity);
  }

  public function supportsClass($class)
  {
    try
    {
      return $this->getACLEntityInfo($class);
    } catch (\RunTimeException $e)
    {
      return false;
    }
  }

  private function getACLEntityInfo($class)
  {
    if (!isset(ACLHelper::$ACLEntityNameArray[ACLHelper::getRepositoryNameByClassName($class)]))
    {
      return false;
    }
    return ACLHelper::$ACLEntityNameArray[ACLHelper::getRepositoryNameByClassName($class)];
  }

  public function supportsAttribute($attribute)
  {
    return $this->permissionMap->getMasks((string) $attribute, null);
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
    }
    else
    {
      $oid = $this->objectIdentityRetrievalStrategy->getObjectIdentity($entity);
    }


    try
    {
      $acl = $this->aclProvider->findAcl($oid, $sids);
      if ($acl->isGranted($mask, $sids))
      {
        if (null !== $this->logger)
        {
          $this->logger->info(sprintf('[ACLInheritanceVoter][GRANT] ACL found, permission granted.'));
        }
        return self::ACCESS_GRANTED;
      }
      elseif (null !== $this->logger)
      {
        $this->logger->info('[ACLInheritanceVoter][DENY] ACL found, permission denied.');
      }
      return self::ACCESS_DENIED;
    } catch (\Exception $e)
    {
      //other exception than acl/ace not found
      if (!($e instanceof AclNotFoundException || $e instanceof NoAceFoundException || $e instanceof ErrorException))
      {
        throw $e;
      }
      //check parent if no permission on child
      $ACLEntityInfo = $this->supportsClass(get_class($entity));
      if ($ACLEntityInfo && isset($ACLEntityInfo['parent']))
      {
        $parent = call_user_func_array(array($entity, $ACLEntityInfo['parent']), array());
        if (null !== $this->logger)
        {
          $this->logger->info(sprintf('[ACLInheritanceVoter] ACL not found, looking for parent : %s', get_class($parent)));
        }
        return $this->isGranted($sids, $mask, $parent);
      }
      //no more parent
      elseif (null !== $this->logger)
      {
        $this->logger->info('[ACLInheritanceVoter][DENY] ACL not found, no more parent, permission denied.');
      }
      return self::ACCESS_DENIED;
    }
    throw new InvalidArgumentException(
      sprintf('[ACLInheritanceVoter] Failed to resolve permission for %s.', get_class($entity))
    );
  }
}