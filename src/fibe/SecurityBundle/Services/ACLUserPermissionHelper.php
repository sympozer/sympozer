<?php
  namespace fibe\SecurityBundle\Services;

  use Symfony\Component\Security\Acl\Exception\AclNotFoundException;
  use Symfony\Component\Security\Core\SecurityContext;
  use Symfony\Component\Security\Core\Exception\AccessDeniedException;
  use Doctrine\ORM\EntityManager;
  use Doctrine\ORM\QueryBuilder;
  use Symfony\Component\Security\Acl\Dbal\MutableAclProvider;
  use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
  use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity;
  use Symfony\Component\Security\Acl\Permission\MaskBuilder;
  use Symfony\Component\Security\Acl\Exception\NoAceFoundException;
  use fibe\SecurityBundle\Services\ACLHelper;
  use fibe\SecurityBundle\Services\ACLEntityHelper;
  use fibe\SecurityBundle\Entity\UserConfPermission;
  use fibe\SecurityBundle\Entity\ConfPermission; 

  use fibe\SecurityBundle\Form\UserConfPermissionType;

  /** 
   * Explaination on the role table :
   *     http://symfony.com/fr/doc/current/cookbook/security/acl_advanced.html#table-de-permission-integree
   */
  class ACLUserPermissionHelper extends ACLEntityHelper
  {

    /** 
     * entities to change right when changing right of the conference
     * @var array
     */
    // public static $belongsToConfRepositories = array(
    //   'ConfEvent',
    //   'Location',
    //   'Paper',
    //   'Person',
    //   'Role',
    //   'Organization',
    //   'Topic'
    // ); 

    const NOT_AUTHORYZED_UPDATE_RIGHT_LABEL = 'You need to be MASTER to be able to change other user permission on %s %s ';

    /**
     * get or create a UserConfPermission object to show or get a form
     *
     * @param    [User]  $manager       the manager to get permissions of. if null : current user
     * @param bool $restrictForm
     *
     * @internal param bool $restrict if none : returns "view" as action  if no manager given to add teamate when the given user doesn't have the owner required permission to update others permission  on the object
     * @return \fibe\SecurityBundle\Entity\UserConfPermission [UserConfPermission]   object listing permission for an user used to show or build a form
     */
    public function getUserConfPermission($manager=null, $restrictForm = true)
    {
      $currentMainEvent = $this->getCurrentMainEvent();
      $user = $this->getUser();

      $userConfPermission = new UserConfPermission();
      if($manager)$userConfPermission->setUser($manager);
      $noManager = ($manager == null);
      if($noManager) $manager = $user;

      $formAllowed = false;
      $isOwner = false;

      $entity = $currentMainEvent;
      $newManagerDefaultAction = 'EDIT';
      $repositoryName = 'MainEvent';
      $entityLabel = 'Conference';
      $confPermission=$this->newConfPermission($user,$restrictForm,$formAllowed,$noManager,$manager,$entity,$newManagerDefaultAction,$repositoryName,$entityLabel);
      $userConfPermission->addConfPermission($confPermission);

      $entity = $currentMainEvent->getAppConfig();
      $newManagerDefaultAction = 'EDIT';
      $repositoryName = 'MobileAppConfig';
      $entityLabel = 'Mobile application';
      $confPermission=$this->newConfPermission($user,$restrictForm,$formAllowed,$noManager,$manager,$entity,$newManagerDefaultAction,$repositoryName,$entityLabel);
      $userConfPermission->addConfPermission($confPermission);

      $entity = $currentMainEvent->getModule();
      $newManagerDefaultAction = 'EDIT';
      $repositoryName = 'Module';
      $entityLabel = 'Modules';
      $confPermission=$this->newConfPermission($user,$restrictForm,$formAllowed,$noManager,$manager,$entity,$newManagerDefaultAction,$repositoryName,$entityLabel);
      $userConfPermission->addConfPermission($confPermission);

      $entity = $currentMainEvent->getTeam();
      $newManagerDefaultAction = 'VIEW';
      $repositoryName = 'Team';
      $entityLabel = 'Team';
      $confPermission=$this->newConfPermission($user,$restrictForm,$formAllowed,$noManager,$manager,$entity,$newManagerDefaultAction,$repositoryName,$entityLabel);
      $userConfPermission->addConfPermission($confPermission);

      $userConfPermission->setRestricted(!$formAllowed);
      $userConfPermission->setIsOwner("OWNER" == $this->getACEByEntity($currentMainEvent,$manager));
      
      return $userConfPermission; 
    }

    /**
     * process UserConfPermission to change all given permissions
     *    with "checks" on user given in UserConfPermission->getUser()
     *
     * @param  UserConfPermission $userConfPermission the object with the user & his permission
     *
     * @throws \Symfony\Component\Security\Core\Exception\AccessDeniedException
     */
    public function updateUserConfPermission(UserConfPermission $userConfPermission)
    {
      $teamate = $userConfPermission->getUser();
      // cannot demote own permission
      if($teamate->getId() == $this->getUser()->getId())
      {
        throw new AccessDeniedException("You cannot demote yourself.");
      }
      // cannot demote the owner of the conference
      try {
        if("OWNER" == $this->getACEByEntity($this->getCurrentMainEvent(),$teamate))
        {
          throw new AccessDeniedException("You cannot demote the owner.");
        }
      } catch (NoAceFoundException $e) {
        //ignore NoAceFoundException : new teamate without ace cannot be found...
      }
      foreach ($userConfPermission->getConfPermissions() as $confPermission)
      {
        $repositoryName = $confPermission->getRepositoryName();
        $action = $confPermission->getAction();
        $id=$confPermission->getEntityId();

        //check if update is required
        try {
          if($action == $this->getACEByRepositoryName($repositoryName, $teamate, $id))continue; 
        } catch (NoAceFoundException $e) {
          //ignore NoAceFoundException : new teamate without ace cannot be found...
        }

        //if it's the conference object, update all object in static::$belongsToConfRepositories
        // if($repositoryName == ACLEntityHelper::LINK_WITH)
        // {
        //   foreach (static::$belongsToConfRepositories as $subRepositoryName) {
        //     $this->updateUserACL($teamate, $action, $subRepositoryName);
        //   }
        // }
        $this->updateUserACL($teamate, $action, $repositoryName, $id);
      }
    }

    /** 
     * create acl with permission check for one entity
     * @param  [User] $teamate           the choosen teamate
     * @param  [type] $entity            the entity to update permissions 
     */
    public function createUserACL($teamate,$entity)
    {
      try {
        $action = $this->getACEByEntity($entity,$teamate);
      } catch (NoAceFoundException $e) {
        $action = $this->getACEByEntity($this->getCurrentMainEvent(),$teamate);
      }
      $this->performUpdateUserACL($teamate,$action,$entity);
    }

    /** 
     * update the teamate right by repository & id
     * @param  [User] $teamate           the choosen teamate
     * @param  [String] $action          [description]
     * @param  [String] $repositoryName  [description]
     * @param  [type] $id                if not set, update all objects of the repository given linked with the current conf
     */
    private function updateUserACL($teamate,$action,$repositoryName,$id=null)
    { 
      if(!$id)
      {
        $entities = $this->getEntitiesACL("VIEW",$repositoryName); 
        foreach ($entities as $entity)
        {
          $this->performUpdateUserACL($teamate,$action,$entity);
        }        
      } else
      {
        $entity = $this->getEntityACL("VIEW",$repositoryName,$id);  
        $this->performUpdateUserACL($teamate,$action,$entity);
      } 
    }

    /**
     * update user acl by entity 
     *   /!\ doesn't check owner demoting and own permission change, see updateUserConfPermission for those requirment check
     * @param  [User] $teamate [description]
     * @param  [String] $action[description]
     * @param  [type] $entity  [description] 
     */
    private function performUpdateUserACL($teamate,$action,$entity)
    { 
      $entitySecurityIdentity = ObjectIdentity::fromDomainObject($entity);
      $acl = $this->getOrCreateAcl($entitySecurityIdentity,$teamate);
      $this->updateOrCreateAce($acl,$entity,$teamate,$action); 
    }

    private function getOrCreateAcl($entitySecurityIdentity,$user)
    {
      $userSecurityIdentity = UserSecurityIdentity::fromAccount($user);
      try
      { 
        $acl = $this->aclProvider->findAcl(
          $entitySecurityIdentity,
          array($userSecurityIdentity)
        );
      }
      catch (AclNotFoundException $e)
      {
        $acl = $this->aclProvider->createAcl($entitySecurityIdentity);
      }
      return $acl;
    }

    /**
     * process permission change
     *
     *  if the user is master : OK
     *  else if he's OPERATOR and he wants to add a member ( catch (AclNotFoundException $e) )
     *        affect VIEW as default right
     *  else : do nothing
     * @param  [type] $entity               the object to change permission
     * @param  [type] $user                 the user to change permission
     * @param  [type] $acl                  the acl to update
     * @param  [String] $action             the action to set
     */
    private function updateOrCreateAce($acl,$entity,$user,$action)
    {
      $currentUserRight = $this->getACEByEntity($entity);  
      try {
          //get the ace index
          $ace = $this->getACEByEntity($entity,$user,"all",$acl); 
          //master permission required to update permissions
          if($ace['action'] != $action && ("MASTER" == $currentUserRight || "OWNER" == $currentUserRight))
          {
            $acl->updateObjectAce(
              $ace['index'],
              $this->getMask($action)
            );
            $this->aclProvider->updateAcl($acl);
          } 
      }
      catch (NoAceFoundException $e)
      {
        //if it's a new manager or object thus the ace isn't found
        $userSecurityIdentity = UserSecurityIdentity::fromAccount($user); 
        if("MASTER" == $currentUserRight || "OWNER" == $currentUserRight )
        {
          $acl->insertObjectAce(
            $userSecurityIdentity,
            $this->getMask($action)
          );
        } 
        //if not master : set default right to view
        else
        {
          $acl->insertObjectAce(
            $userSecurityIdentity,
            $this->getMask("VIEW")
          );
        }
        $this->aclProvider->updateAcl($acl);
      }  
    }

    //used only by getUserConfPermission
    private function newConfPermission($user,$restrictForm,&$formAllowed,$noManager,$manager,$entity,$newManagerDefaultAction,$repositoryName,$entityLabel)
    {
      $currentUserAction = $this->getACEByEntity($entity,$user);
      $isMaster = ($currentUserAction == "OWNER" || $currentUserAction == "MASTER");
      $allowed = !$restrictForm || $isMaster;
      $action = !$allowed ? 'VIEW' : ($noManager ? $newManagerDefaultAction : $this->getACEByEntity($entity,$manager));
      $formAllowed |= $isMaster;
      
      $confPermission = new ConfPermission();
      $confPermission->setEntityLabel($entityLabel);
      $confPermission->setAction($action);
      $confPermission->setRestricted(!$allowed);
      $confPermission->setRepositoryName($repositoryName);
      $confPermission->setEntityId($entity->getId());
      return $confPermission;
    }
  } 