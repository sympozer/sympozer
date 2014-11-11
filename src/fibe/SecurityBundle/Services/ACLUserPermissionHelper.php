<?php
namespace fibe\SecurityBundle\Services;

use fibe\SecurityBundle\Entity\ConfPermission;
use fibe\SecurityBundle\Entity\Teammate;
use Symfony\Component\Security\Acl\Exception\NoAceFoundException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

;

/** role table :
 * @see http://symfony.com/fr/doc/current/cookbook/security/acl_advanced.html#table-de-permission-integree
 */
class ACLUserPermissionHelper extends ACLEntityHelper
{

  const NOT_AUTHORYZED_UPDATE_RIGHT_LABEL = 'You need to be MASTER to be able to change other user permission on %s %s ';

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
    $teammateUser = $teammate->getPerson()->getUser();
    // cannot demote own permission
    if ($teammateUser->getId() == $this->getUser()->getId())
    {
      throw new AccessDeniedException("You cannot demote yourself.");
    }
    // cannot demote the owner of the conference
    try
    {
      if ("OWNER" == $this->getACEByEntity($this->currentMainEvent, $teammateUser))
      {
        throw new AccessDeniedException("You cannot demote the owner.");
      }
    } catch (NoAceFoundException $e)
    {
      //ignore NoAceFoundException : new teammate without ace cannot be found. => go on
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
        $entity = $this->getEntitiesInConf($repositoryName, $id);
        if ($action == $this->getACEByEntity($entity, $this->getUser()))
        {
          continue; // no update required
        }
      } catch (NoAceFoundException $e)
      {
        //ignore NoAceFoundException : new teammate without ace cannot be found. => go on
      }
      $this->performUpdateUserACL($teammate, $action, $entity);
    }
  }

  /**
   * create acl with permission check for one entity
   * @param  [User] $teammate          the chosen teammate
   * @param  [type] $entity            the entity to update permissions
   */
  public function createUserACL($teammate, $entity)
  {
    try
    {
      $action = $this->getACEByEntity($entity, $teammate);
    } catch (NoAceFoundException $e)
    {
      $action = $this->getACEByEntity($this->currentMainEvent, $teammate);
    }
    $this->performUpdateUserACL($teammate, $action, $entity);
  }
}