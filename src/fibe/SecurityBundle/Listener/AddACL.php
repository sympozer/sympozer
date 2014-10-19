<?php
  namespace fibe\SecurityBundle\Listener;

  use Doctrine\ORM\Event\LifecycleEventArgs; 
  use Symfony\Component\DependencyInjection\ContainerInterface; 
  use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
  use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
  use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity; 
  use Symfony\Component\Security\Acl\Permission\MaskBuilder;
  use fibe\SecurityBundle\Services\ACLEntityHelper;
  use fibe\SecurityBundle\Services\EntityACLNotRegisteredException;
  /**
   * Post persist doctrine listener that add the acl MASTER for the current user 
   *   also set a right for all user of the team
   */
  class AddACL {
    protected $container;

    public function __construct(ContainerInterface $container)
    {
      $this->container = $container;
    }

    public function postPersist(LifecycleEventArgs $args)
    {
      // $entityManager = $args->getEntityManager();
      $entity = $args->getEntity();
      $token = $this->container->get('security.context')->getToken();
      if (!isset($token))return;
      $user = $token->getUser();

      try {
        $aclHelper = $this->container->get('fibe_security.acl_user_permission_helper');
        //check if the entity doesn't have a parent in the hierarchy of ACL
        if(!isset(ACLEntityHelper::$ACLEntityNameArray[ACLEntityHelper::getRepositoryNameByClassName(get_class($entity))]['parent']))
        {
            
          $aclHelper->getClassNameByRepositoryName($this->get_real_class($entity));
          // create the ACL
          $aclProvider = $this->container->get('security.acl.provider');

          $objectIdentity = ObjectIdentity::fromDomainObject($entity);
          $acl = $aclProvider->createAcl($objectIdentity);

          $securityIdentity = UserSecurityIdentity::fromAccount($user);

          // grant owner access
          $acl->insertObjectAce($securityIdentity, MaskBuilder::MASK_OWNER);
          $aclProvider->updateAcl($acl);
          //share with teamates
//          $teamates = $user->getCurrentMainEvent()->getTeam()->getTeammates();
//          foreach ($teamates as $teamate)
//          {
//            if($teamate->getId() != $user->getId())
//            {
//              $aclHelper->createUserACL($teamate,$entity);
//            }
//          }
        }
      } catch(EntityACLNotRegisteredException $e){
        // just don't add acl
      }
    }
    /**
     * Get an object class name without namespaces
     */
    function get_real_class($obj) {
        $classname = get_class($obj);
        if ($pos = strrpos($classname, '\\')) return substr($classname, $pos + 1);
        return $pos;
    }
  }