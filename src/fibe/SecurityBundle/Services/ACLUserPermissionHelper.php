<?php
namespace fibe\SecurityBundle\Services;

use fibe\SecurityBundle\Entity\ConfPermission;
use fibe\SecurityBundle\Entity\Teammate;
use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity;
use Symfony\Component\Security\Acl\Exception\AclNotFoundException;
use Symfony\Component\Security\Acl\Exception\NoAceFoundException;;
use Symfony\Component\Security\Acl\Model\MutableAclInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
/** role table :
 *     @see http://symfony.com/fr/doc/current/cookbook/security/acl_advanced.html#table-de-permission-integree
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
   * get or create a Teammate object to show or get a form
   *
   * @param    [User]  $manager       the manager to get permissions of. if null : current user
   * @param bool $restrictForm if none : returns "view" as action  if no manager given to add teammate when the given user doesn't have the owner required permission to update others permission  on the object
   * @return \fibe\SecurityBundle\Entity\Teammate [Teammate]   object listing permission for an user used to show or build a form
   */
  public function getTeammate($manager = null, $restrictForm = true)
  {
    $currentMainEvent = $this->getCurrentMainEvent();
    $user = $this->getUser();

    $teammate = new Teammate();
    if ($manager)
    {
      $teammate->setUser($manager);
    }
    $noManager = ($manager == null);
    if ($noManager)
    {
      $manager = $user;
    }

    $formAllowed = false;

    $entity = $currentMainEvent;
    $newManagerDefaultAction = 'EDIT';
    $repositoryName = 'MainEvent';
    $entityLabel = 'Conference';
    $confPermission = $this->newConfPermission($user, $restrictForm, $formAllowed, $noManager, $manager, $entity, $newManagerDefaultAction, $repositoryName, $entityLabel);
    $teammate->addConfPermission($confPermission);

//    $entity = $currentMainEvent->getAppConfig();
//    $newManagerDefaultAction = 'EDIT';
//    $repositoryName = 'MobileAppConfig';
//    $entityLabel = 'Mobile application';
//    $confPermission = $this->newConfPermission($user, $restrictForm, $formAllowed, $noManager, $manager, $entity, $newManagerDefaultAction, $repositoryName, $entityLabel);
//    $teammate->addConfPermission($confPermission);
//
//    $entity = $currentMainEvent->getModule();
//    $newManagerDefaultAction = 'EDIT';
//    $repositoryName = 'Module';
//    $entityLabel = 'Modules';
//    $confPermission = $this->newConfPermission($user, $restrictForm, $formAllowed, $noManager, $manager, $entity, $newManagerDefaultAction, $repositoryName, $entityLabel);
//    $teammate->addConfPermission($confPermission);

    $entity = $currentMainEvent->getTeam();
    $newManagerDefaultAction = 'VIEW';
    $repositoryName = 'Team';
    $entityLabel = 'Team';
    $confPermission = $this->newConfPermission($user, $restrictForm, $formAllowed, $noManager, $manager, $entity, $newManagerDefaultAction, $repositoryName, $entityLabel);
    $teammate->addConfPermission($confPermission);

    $teammate->setRestricted(!$formAllowed);
    $teammate->setIsOwner("OWNER" == $this->getACEByEntity($currentMainEvent, $manager));

    return $teammate;
  }

  /**
   * process Teammate to change all given permissions
   *    with "checks" on user given in Teammate->getUser()
   *
   * @param  Teammate $teammate : user & his permission
   *
   * @throws \Symfony\Component\Security\Core\Exception\AccessDeniedException
   */
  public function updateTeammate(Teammate $teammate)
  {
    $teammate = $teammate->getUser();
    // cannot demote own permission
    if ($teammate->getId() == $this->getUser()->getId())
    {
      throw new AccessDeniedException("You cannot demote yourself.");
    }
    // cannot demote the owner of the conference
    try
    {
      if ("OWNER" == $this->getACEByEntity($this->getCurrentMainEvent(), $teammate))
      {
        throw new AccessDeniedException("You cannot demote the owner.");
      }
    } catch (NoAceFoundException $e)
    {
      //ignore NoAceFoundException : new teammate without ace cannot be found...
    }
    foreach ($teammate->getConfPermissions() as $confPermission)
    {
      /** @var ConfPermission $confPermission */
      $repositoryName = $confPermission->getRepositoryName();
      $action = $confPermission->getAction();
      $id = $confPermission->getEntityId();

      //check if update is required
      try
      {
        if ($action == $this->getACEByRepositoryName($repositoryName, $teammate, $id))
        {
          continue;
        }
      } catch (NoAceFoundException $e)
      {
        //ignore NoAceFoundException : new teammate without ace cannot be found...
      }

      $this->updateUserACL($teammate, $action, $repositoryName, $id);
    }
  }

  /**
   * create acl with permission check for one entity
   * @param  [User] $teammate           the choosen teammate
   * @param  [type] $entity            the entity to update permissions
   */
  public function createUserACL($teammate, $entity)
  {
    try
    {
      $action = $this->getACEByEntity($entity, $teammate);
    } catch (NoAceFoundException $e)
    {
      $action = $this->getACEByEntity($this->getCurrentMainEvent(), $teammate);
    }
    $this->performUpdateUserACL($teammate, $action, $entity);
  }

  //used only by getTeammate
  private function newConfPermission($user, $restrictForm, &$formAllowed, $noManager, $manager, $entity, $newManagerDefaultAction, $repositoryName, $entityLabel)
  {
    $currentUserAction = $this->getACEByEntity($entity, $user);
    $isMaster = ($currentUserAction == "OWNER" || $currentUserAction == "MASTER");
    $allowed = !$restrictForm || $isMaster;
    $action = !$allowed ? 'VIEW' : ($noManager ? $newManagerDefaultAction : $this->getACEByEntity($entity, $manager));
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