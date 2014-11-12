<?php
namespace fibe\SecurityBundle\Services;

use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity;
use Symfony\Component\Security\Acl\Exception\AclNotFoundException;
use Symfony\Component\Security\Acl\Exception\NoAceFoundException;
use Symfony\Component\Security\Acl\Model\EntryInterface;
use Symfony\Component\Security\Acl\Model\MutableAclInterface;

;

/** role table :
 * @see http://symfony.com/fr/doc/current/cookbook/security/acl_advanced.html#table-de-permission-integree
 */
class ACLUserPermissionHelper extends ACLEntityHelper
{

//  const NOT_AUTHORYZED_UPDATE_RIGHT_LABEL = 'You need to be MASTER to be able to change other user permission on %s %s ';

//  /**
//   * get or create a Teammate object to show or get a form
//   *
//   * @param \fibe\SecurityBundle\Entity\Teammate       the teammate to get permissions of. if null : current user
//   * @return \fibe\SecurityBundle\Entity\Teammate      the teammate with filled confPermissions
//   */
//  public function getPermissionForTeammate(Teammate $teammate)
//  {
//    $currentMainEvent = $teammate->getTeam()->getMainEvent();
//
////    $teammateAction = $this->getACEByEntity($currentMainEvent, $teammate->getPerson()->getUser());
//    $action = 'OPERATOR';
//    $repositoryName = 'MainEvent';
//    $entityLabel = 'Main event';
//    $confPermission = $this->addConfPermission($action, $currentMainEvent, $repositoryName, $entityLabel);
//    $teammate->addConfPermission($confPermission);
//
////    $entity = $currentMainEvent->getAppConfig();
////    $action = 'EDIT';
////    $repositoryName = 'MobileAppConfig';
////    $entityLabel = 'Mobile application';
////    $confPermission = $this->addConfPermission($action, $entity, $repositoryName, $entityLabel);
////    $teammate->addConfPermission($confPermission);
////
////    $entity = $currentMainEvent->getModule();
////    $action = 'EDIT';
////    $repositoryName = 'Module';
////    $entityLabel = 'Modules';
////    $confPermission = $this->addConfPermission($action, $entity, $repositoryName, $entityLabel);
////    $teammate->addConfPermission($confPermission);
//
////    $entity = $currentMainEvent->getTeam();
////    $action = 'VIEW';
////    $repositoryName = 'Team';
////    $entityLabel = 'Team';
////    $confPermission = $this->addConfPermission($action, $entity, $repositoryName, $entityLabel);
////    $teammate->addConfPermission($confPermission);
//
//    return $teammate;
//  }
//
//  //used only by getPermissionForTeammate
//  private function addConfPermission($action, $entity, $repositoryName, $entityLabel)
//  {
//    $confPermission = new ConfPermission();
//    $confPermission->setEntityLabel($entityLabel);
//    $confPermission->setAction($action);
//    $confPermission->setRepositoryName($repositoryName);
//    $confPermission->setEntityId($entity->getId());
//    return $confPermission;
//  }

//  /**
//   * process Teammate to change all given permissions
//   *    with "checks" on user given in Teammate->getUser()
//   *
//   * @param  Teammate $teammate : user & his permission
//   *
//   * @throws \Symfony\Component\Security\Core\Exception\AccessDeniedException
//   */
//  public function updateTeammate(Teammate $teammate)
//  {
//    echo "updateTeammate";
//    die;
//    $teammateUser = $teammate->getPerson()->getUser();
//    // cannot demote own permission
//    if ($teammateUser->getId() == $this->getUser()->getId())
//    {
//      throw new AccessDeniedException("You cannot demote yourself.");
//    }
//    // cannot demote the owner of the conference
//    try
//    {
//      if ("OWNER" == $this->getACEByEntity($this->currentMainEvent, $teammateUser))
//      {
//        throw new AccessDeniedException("You cannot demote the owner.");
//      }
//    } catch (NoAceFoundException $e)
//    {
//      //ignore NoAceFoundException : new teammate without ace cannot be found. => go on
//    }
//    foreach ($teammate->getConfPermissions() as $confPermission)
//    {
//      //TODO fix this
//      /** @var ConfPermission $confPermission */
//      $repositoryName = $confPermission->getRepositoryName();
//      $action = $confPermission->getAction();
//      $id = $confPermission->getEntityId();
//
//      //check if update is required
//      try
//      {
//        //TODO fix this
//        $entity = $this->getEntitiesInConf($repositoryName, $id);
//        if ($action == $this->getACEByEntity($entity, $this->getUser()))
//        {
//          continue; // no update required
//        }
//      } catch (NoAceFoundException $e)
//      {
//        //ignore NoAceFoundException : new teammate without ace cannot be found. => go on
//      }
//      $this->performUpdateUserACL($teammate, $action, $entity);
//    }
//  }

  /**
   * update user acl by entity
   *   /!\ doesn't check owner demoting and own permission change, see updateTeammate for those requirment check
   * @param \FOS\UserBundle\Model\UserInterface $user
   * @param $action
   * @param $entity
   */
  public function performUpdateUserACL(Userinterface $user, $action, $entity)
  {
    $entitySecurityIdentity = ObjectIdentity::fromDomainObject($entity);
    $acl = $this->getOrCreateAcl($entitySecurityIdentity, $user);
    $this->updateOrCreateAce($acl, $entity, $user, $action);
  }

  /**
   * @param $entitySecurityIdentity
   * @param $user
   * @return \Symfony\Component\Security\Acl\Model\MutableAclInterface
   */
  protected function getOrCreateAcl($entitySecurityIdentity, Userinterface $user)
  {
    $userSecurityIdentity = UserSecurityIdentity::fromAccount($user);
    try
    {
      $acl = $this->aclProvider->findAcl(
        $entitySecurityIdentity,
        array($userSecurityIdentity)
      );
    } catch (AclNotFoundException $e)
    {
      $acl = $this->aclProvider->createAcl($entitySecurityIdentity);
    }
    return $acl;
  }

  /**
   * process permission change
   *
   *  if the user is master : OK
   *  else : do nothing
   * @param MutableAclInterface $acl
   * @param $entity
   * @param UserInterface $user
   * @param $action
   */
  protected function updateOrCreateAce(MutableAclInterface $acl, $entity, UserInterface $user, $action)
  {
    try
    {
      //get the ace index
      $ace = $this->getACEByEntity($entity, $user, "all", $acl);
      //master permission required to update permissions
      if ($this->getMask($ace['action']) != $this->getMask($action) && ("MASTER" == $ace['action'] || "OWNER" == $ace['action']))
      {
        $acl->updateObjectAce(
          $ace['index'],
          $this->getMask($action)
        );
        $this->aclProvider->updateAcl($acl);
      }
    } catch (NoAceFoundException $e)
    {
      //if it's a new manager or object thus the ace isn't found
      $userSecurityIdentity = UserSecurityIdentity::fromAccount($user);
      $acl->insertObjectAce(
        $userSecurityIdentity,
        $this->getMask($action)
      );
      $this->aclProvider->updateAcl($acl);
    }
  }

  public function performDeleteUserACL(Userinterface $user, $entity)
  {
    // Get all aces and try to get ACE for user to fire
    $userSecurityIdentity = UserSecurityIdentity::fromAccount($user);
    $objectIdentity = ObjectIdentity::fromDomainObject($entity);
    $acl = $this->aclProvider->findAcl($objectIdentity);
    $aces = $acl->getObjectAces();
    foreach ($aces as $i => $ace)
    {
      /** @var $ace EntryInterface */
      if ($ace->getSecurityIdentity() == $userSecurityIdentity)
      {
        $acl->deleteObjectAce($i);
      }
    }
    $this->aclProvider->updateAcl($acl);
  }

//  /**
//   * create acl with permission check for one entity
//   * @param  [User] $teammate          the chosen teammate
//   * @param  [type] $entity            the entity to update permissions
//   */
//  public function createUserACL($teammate, $entity)
//  {
//    try
//    {
//      $action = $this->getACEByEntity($entity, $teammate);
//    } catch (NoAceFoundException $e)
//    {
//      $action = $this->getACEByEntity($this->currentMainEvent, $teammate);
//    }
//    $this->performUpdateUserACL($teammate, $action, $entity);
//  }
}