<?php
namespace fibe\SecurityBundle\Services;

use fibe\SecurityBundle\Entity\ConfPermission;
use fibe\SecurityBundle\Entity\UserConfPermission;
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
   * get or create a UserConfPermission object to show or get a form
   *
   * @param    [User]  $manager       the manager to get permissions of. if null : current user
   * @param bool $restrictForm if none : returns "view" as action  if no manager given to add teamate when the given user doesn't have the owner required permission to update others permission  on the object
   * @return \fibe\SecurityBundle\Entity\UserConfPermission [UserConfPermission]   object listing permission for an user used to show or build a form
   */
  public function getUserConfPermission($manager = null, $restrictForm = true)
  {
    $currentMainEvent = $this->getCurrentMainEvent();
    $user = $this->getUser();

    $userConfPermission = new UserConfPermission();
    if ($manager)
    {
      $userConfPermission->setUser($manager);
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
    $userConfPermission->addConfPermission($confPermission);

//    $entity = $currentMainEvent->getAppConfig();
//    $newManagerDefaultAction = 'EDIT';
//    $repositoryName = 'MobileAppConfig';
//    $entityLabel = 'Mobile application';
//    $confPermission = $this->newConfPermission($user, $restrictForm, $formAllowed, $noManager, $manager, $entity, $newManagerDefaultAction, $repositoryName, $entityLabel);
//    $userConfPermission->addConfPermission($confPermission);
//
//    $entity = $currentMainEvent->getModule();
//    $newManagerDefaultAction = 'EDIT';
//    $repositoryName = 'Module';
//    $entityLabel = 'Modules';
//    $confPermission = $this->newConfPermission($user, $restrictForm, $formAllowed, $noManager, $manager, $entity, $newManagerDefaultAction, $repositoryName, $entityLabel);
//    $userConfPermission->addConfPermission($confPermission);

    $entity = $currentMainEvent->getTeam();
    $newManagerDefaultAction = 'VIEW';
    $repositoryName = 'Team';
    $entityLabel = 'Team';
    $confPermission = $this->newConfPermission($user, $restrictForm, $formAllowed, $noManager, $manager, $entity, $newManagerDefaultAction, $repositoryName, $entityLabel);
    $userConfPermission->addConfPermission($confPermission);

    $userConfPermission->setRestricted(!$formAllowed);
    $userConfPermission->setIsOwner("OWNER" == $this->getACEByEntity($currentMainEvent, $manager));

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
    if ($teamate->getId() == $this->getUser()->getId())
    {
      throw new AccessDeniedException("You cannot demote yourself.");
    }
    // cannot demote the owner of the conference
    try
    {
      if ("OWNER" == $this->getACEByEntity($this->getCurrentMainEvent(), $teamate))
      {
        throw new AccessDeniedException("You cannot demote the owner.");
      }
    } catch (NoAceFoundException $e)
    {
      //ignore NoAceFoundException : new teamate without ace cannot be found...
    }
    foreach ($userConfPermission->getConfPermissions() as $confPermission)
    {
      $repositoryName = $confPermission->getRepositoryName();
      $action = $confPermission->getAction();
      $id = $confPermission->getEntityId();

      //check if update is required
      try
      {
        if ($action == $this->getACEByRepositoryName($repositoryName, $teamate, $id))
        {
          continue;
        }
      } catch (NoAceFoundException $e)
      {
        //ignore NoAceFoundException : new teamate without ace cannot be found...
      }

      $this->updateUserACL($teamate, $action, $repositoryName, $id);
    }
  }

  /**
   * create acl with permission check for one entity
   * @param  [User] $teamate           the choosen teamate
   * @param  [type] $entity            the entity to update permissions
   */
  public function createUserACL($teamate, $entity)
  {
    try
    {
      $action = $this->getACEByEntity($entity, $teamate);
    } catch (NoAceFoundException $e)
    {
      $action = $this->getACEByEntity($this->getCurrentMainEvent(), $teamate);
    }
    $this->performUpdateUserACL($teamate, $action, $entity);
  }

  //used only by getUserConfPermission
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