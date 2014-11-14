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

  /**
   * update user acl by entity<br/>
   *   /!\ doesn't check any right
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
}