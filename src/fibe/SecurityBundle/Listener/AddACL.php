<?php
namespace fibe\SecurityBundle\Listener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use fibe\CommunityBundle\Entity\Person;
use fibe\EventBundle\Entity\MainEvent;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;

/**
 * Post persist listener that add the acl OWNER for the current user
 */
class AddACL
{
  protected $container;

  public function __construct(ContainerInterface $container)
  {
    $this->container = $container;
  }

  public function postPersist(LifecycleEventArgs $args)
  {
    // $entityManager = $args->getEntityManager();
    $entity = $args->getEntity();

    //just add acl for MainEvent and Person
    if (!($entity instanceof Person || $entity instanceof MainEvent))
    {
      return;
    }

    $user = null;

    $token = $this->container->get('security.context')->getToken();
    if (isset($token))
    {
      $user = $token->getUser();
    }
    if (!$user && $entity instanceof Person)
    {
      $user = $entity->getUser();
    }

    //should happen when creating a MainEvent and
    if (!($user instanceof UserInterface))
    {
      throw new UnauthorizedHttpException('negotiate', 'You must be logged in');
    }

    $aclHelper = $this->container->get('fibe_security.acl_user_permission_helper');
    $aclHelper->performUpdateUserACL($user, MaskBuilder::MASK_OWNER, $entity);

//    //only set acl of mainEvent and Person because they are top level in the permission
//    $aclInfo = ACLHelper::isManaged(get_class($entity));
//    if ($aclInfo && !isset($aclInfo['parent']))
//    {
//      // create the ACL
//      $aclProvider = $this->container->get('security.acl.provider');
//
//      $objectIdentity = ObjectIdentity::fromDomainObject($entity);
//      $acl = $aclProvider->createAcl($objectIdentity);
//
//      $securityIdentity = UserSecurityIdentity::fromAccount($user);
//
//      // grant owner access
//      $acl->insertObjectAce($securityIdentity, MaskBuilder::MASK_OWNER);
//      $aclProvider->updateAcl($acl);
//      //share with teammates
////      $teammates = $user->getCurrentMainEvent()->getTeam()->getTeammates();
////      foreach ($teammates as $teammate)
////      {
////        if($teammate->getId() != $user->getId())
////        {
////          $aclHelper->performUpdateUserACL($teammate, "MASTER", $entity);
////        }
////      }
//    }
  }

  /**
   * Get an object class name without namespaces
   */
  function get_real_class($obj)
  {
    $classname = get_class($obj);
    if ($pos = strrpos($classname, '\\'))
    {
      return substr($classname, $pos + 1);
    }
    return $pos;
  }
}