<?php
namespace fibe\SecurityBundle\Services;

use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity;
use Symfony\Component\Security\Acl\Exception\AclNotFoundException;
use Symfony\Component\Security\Acl\Exception\NoAceFoundException;
use Symfony\Component\Security\Acl\Model\EntryInterface;

/**
 * to be used with this class entity must :
 * - have a link to the conference table
 * - be registered in the here present public static $ACLEntityNameArray
 *
 *  Explaination on the role table
 *     http://symfony.com/fr/doc/current/cookbook/security/acl_advanced.html#table-de-permission-integree
 */

/** @noinspection PhpDocMissingThrowsInspection */
class ACLEntityHelper extends ACLHelper
{
//  const LINK_WITH = 'MainEvent';
//  const DEFAULT_REPOSITORY_BUNDLE = 'ERREUR_DE_DEFINITION_ACL';

  /**get the  allowed action in a hierarchical way
   *
   * @param mixed $entity the entity to get
   * @param UserInterface|null $user the current user if null
   * @param String $returnType all|mask|index|action (all | int binary mask | index of the ace in the acl | readable action i.e. VIEW)
   * @param null $acl provide acl if you already got it
   *
   * @return String VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
   */
  public function getHierarchicalACEByEntity($entity, UserInterface $user, $returnType = "action", $acl = null)
  {
    try
    {
      return $this->getACEByEntity($entity, $user, $returnType, $acl);
    } catch (\Exception $e)
    {
      //catch only acl/ace not found
      if (!($e instanceof AclNotFoundException || $e instanceof NoAceFoundException))
      {
        throw $e;
      }
      //check parent if no permission on child
      if (null !== $parent = self::getParent($entity))
      {
        if (null !== $this->logger)
        {
          $this->logger->debug(sprintf('[ACLEntityHelper] ACL not found, looking for parent : %s', get_class($parent)));
        }
        return $this->getHierarchicalACEByEntity($parent, $user, $returnType, $acl);
      }
    }
    return null;
  }

  /**get the allowed action
   *
   * @param mixed $entity the entity to get permission on
   * @param UserInterface|null $user the current user if null
   * @param String $returnType all|mask|index|action (all | int binary mask | index of the ace in the acl | readable action i.e. VIEW)
   * @param null $acl provide acl if you already got it
   *
   * @throws \Symfony\Component\Security\Acl\Exception\NoAceFoundException
   * @return string (by default) : VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
   */
  public function getACEByEntity($entity, UserInterface $user, $returnType = "action", $acl = null)
  {
    $entitySecurityIdentity = ObjectIdentity::fromDomainObject($entity);
    $userSecurityIdentity = UserSecurityIdentity::fromAccount($user);
    if (!$acl)
    {
      $acl = $this->aclProvider->findAcl(
        $entitySecurityIdentity,
        array($userSecurityIdentity)
      );
    }
    //find the ace for the given user
    foreach ($acl->getObjectAces() as $index => $ace)
    {
      /**@var $ace EntryInterface */
      if ($ace->getSecurityIdentity()->equals($userSecurityIdentity))
      {
        switch ($returnType)
        {
          case 'all':
            return array(
              'mask' => $ace->getMask(),
              'index' => $index,
              'action' => $this->getAction($ace->getMask())
            );
          case 'mask':
            return $ace->getMask();
          case 'index':
            return $index;
          case 'action':
          default:
            return $this->getAction($ace->getMask());
        }
      }
    }
    throw new NoAceFoundException(
      sprintf(
        'Cannot find ACE %s %s for user %s',
        get_class($entity),
        '#' . $entity->getId(),
        $user ? $user->getUsername() : "[current user]"
      )
    );
  }

//  /**
//   * get an entity in the conf with permission check
//   * i.e.
//   *   $entity = $this->get('fibe_security.acl_entity_helper')->checkEntityACL('CREATE','Topic');
//   *   $entity = $this->get('fibe_security.acl_entity_helper')->checkEntityACL('EDIT','Person',$id);
//   *   $entity = $this->get('fibe_security.acl_entity_helper')->checkEntityACL('EDIT','Person',$entity);
//   *
//   * @param String $action VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
//   * @param mixed $entity the entity to get
//   *
//   * @return mixed the entity to get
//   * @throws AccessDeniedException
//   *
//   */
//  public function checkEntityACL($action, $entity)
//  {
//    if (false === $this->securityContext->isGranted($action, $entity))
//    {
//      throw new AccessDeniedException(
//        sprintf(
//          ACLHelper::NOT_AUTHORYZED_ENTITY_LABEL,
//          $action,
//          '#' . $entity->getId()
//        )
//      );
//    }
//    return $entity;
//  }

//  /**
//   * get an entity in the conf with permission check
//   * get every MainEvent when $repositoryName param is = "MainEvent"
//   * i.e.
//   *  $entities = $this->get('fibe_security.acl_entity_helper')->getEntitiesACL('EDIT','Topic');
//   *
//   * @param String $action VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
//   * @param String $repositoryName the class name
//   *
//   * @return array(Entity) entities to get
//   */
//  public function getEntitiesACL($action, $repositoryName)
//  {
//    $repositoryFullName = (
//      isset(self::$ACLEntityNameArray[$repositoryName]["repositoryBundle"])
//        ? self::$ACLEntityNameArray[$repositoryName]["repositoryBundle"]
//        : self::DEFAULT_REPOSITORY_BUNDLE
//      ) . ':' . $repositoryName;
//    $queryBuilder = $this->entityManager->getRepository($repositoryFullName)->createQueryBuilder(
//      'entity'
//    );
//
//    if ($repositoryName != self::LINK_WITH)
//    {
//      $this->restrictQueryBuilderByConferenceId($queryBuilder);
//    }
//
//    $entities = $queryBuilder->getQuery()->getResult();
//    if ("VIEW" == $action && $repositoryName != self::LINK_WITH)
//    {
//      return $entities;
//    }
//
//    $rtn = array();
//    foreach ($entities as $entity)
//    {
//      if (true === $this->securityContext->isGranted($action, $entity))
//      {
//        $rtn[] = $entity;
//      }
//    }
//
//    return $rtn;
//  }

  /**
   * filter by conferenceId if the repository != this::LINK_WITH
   *
   * @param      $repositoryName
   * @param null $id
   *
   * @return null|object
   */
//  protected function getEntitiesInConf($repositoryName, $id = null)
//  {
//    //TODO ; fix $this->currentMainEvent
//    $entity = null;
//    if ($id)
//    {
//      $findOneByArgs = array('id' => $id);
//      if ($repositoryName != self::LINK_WITH)
//      {
//        $findOneByArgs['mainEvent'] = $this->currentMainEvent;
//      }
//      $entity = $this->entityManager->getRepository($this->getClassNameByRepositoryName($repositoryName))->findOneBy(
//        $findOneByArgs
//      );
//    }
//    else
//    {
//      $className = $this->getClassNameByRepositoryName($repositoryName);
//      $entity = new $className();
//    }
//    if (!$entity)
//    {
//      $this->throwNotFoundHttpException($repositoryName, $id);
//    }
//
//    return $entity;
//  }
}

