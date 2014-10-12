<?php

  namespace fibe\SecurityBundle\Voter;

  use Symfony\Component\Security\Core\Exception\InvalidArgumentException;
  use Symfony\Component\HttpKernel\Log\LoggerInterface;
  use Symfony\Component\Security\Acl\Exception\NoAceFoundException;
  use Symfony\Component\Security\Acl\Exception\AclNotFoundException;
  use Symfony\Component\Security\Acl\Model\AclProviderInterface;
  use Symfony\Component\Security\Acl\Model\ObjectIdentityInterface;
  use Symfony\Component\Security\Acl\Permission\PermissionMapInterface;
  use Symfony\Component\Security\Acl\Model\SecurityIdentityRetrievalStrategyInterface;
  use Symfony\Component\Security\Acl\Model\ObjectIdentityRetrievalStrategyInterface;
  use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
  use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
  use fibe\SecurityBundle\Services\ACLEntityHelper;
  use fibe\SecurityBundle\Services\ACLHelper;

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

    public function supportsAttribute($attribute)
    {
      return $this->permissionMap->getMasks((string) $attribute, null);
    }

    public function supportsClass($class)
    { 
      try {
        return $this->getACLEntityInfo($class);
      } catch (\RunTimeException $e) {
        return false;
      }
    }
 
    public function vote(TokenInterface $token, $entity, array $attributes)
    { 
      // check if class of this object is supported by this voter
      if (!$this->supportsClass(get_class($entity))) {
        if (null !== $this->logger) {
          $this->logger->info(sprintf('[ACLInheritanceVoter] abstain to vote. Not supported entity of type %s', get_class($entity)));
        }
        return self::ACCESS_ABSTAIN;
      }

      // only one arg
      if(1 !== count($attributes)) {
        throw new InvalidArgumentException(
          '[ACLInheritanceVoter] Only one attribute is allowed for is_granted()'
        );
      }
      // check if action is valid
      $mask = $this->supportsAttribute($attribute = $attributes[0]);
      if (!$mask) { 
        throw new InvalidArgumentException(
          sprintf('[ACLInheritanceVoter] Invalid action %s for is_granted().',$attribute)
        );
      }  
      if (null !== $this->logger) {
        $this->logger->info(sprintf('[ACLInheritanceVoter] action => %s, entity => %s', $attribute,get_class($entity)));
      }
      $sids = $this->securityIdentityRetrievalStrategy->getSecurityIdentities($token);
      return $this->isGranted($sids,$mask,$entity);
    }

    private function isGranted($sids,$mask,$entity)
    { 
      //get entity oid / deny if incorrect
      if ($entity instanceof ObjectIdentityInterface) {
          $oid = $entity;
      } elseif (null === $oid = $this->objectIdentityRetrievalStrategy->getObjectIdentity($entity)) {  
          return self::ACCESS_GRANTED;
      }
      try {
        $acl = $this->aclProvider->findAcl($oid, $sids);
        if ($acl->isGranted($mask, $sids)) {
          if (null !== $this->logger) {
              $this->logger->info(sprintf('[ACLInheritanceVoter][GRANT] ACL found, permission granted.'));
          }
          return self::ACCESS_GRANTED;
        }  
        elseif (null !== $this->logger) {
          $this->logger->info('[ACLInheritanceVoter][DENY] ACL found, permission denied.');
        } 
      }
      catch( \Exception $e )
      {
        //check parent if no permission on child
        if ($e instanceof AclNotFoundException || $e instanceof NoAceFoundException)
        {
          $ACLEntityInfo = $this->supportsClass(get_class($entity)) ;
          if($ACLEntityInfo && isset($ACLEntityInfo['parent']))
          {
            $parent = call_user_func_array(array($entity, $ACLEntityInfo['parent']), array());
            if (null !== $this->logger) {
              $this->logger->info(sprintf('[ACLInheritanceVoter] ACL not found, looking for parent : %s',get_class($parent)));
            } 
            return $this->isGranted($sids,$mask,$parent);
          }
          //no more parent  
          elseif (null !== $this->logger) {
            $this->logger->info(sprintf('[ACLInheritanceVoter][DENY] ACL not found, no more parent, permission denied for %s.',get_class($entity)));
          } 
        }
        //other exception than acl/ace not found
        elseif (null !== $this->logger) {
          $this->logger->info(sprintf('[ACLInheritanceVoter][DENY] Exception %s, permission denied.',get_class($e)));
        } 
      }
      return self::ACCESS_DENIED;
    }

    private function getACLEntityInfo($class)
    {
        if (!isset(ACLEntityHelper::$ACLEntityNameArray[ACLEntityHelper::getRepositoryNameByClassName($class)])) {
            return;
        }

        return ACLEntityHelper::$ACLEntityNameArray[ACLEntityHelper::getRepositoryNameByClassName($class)];
    }
  }