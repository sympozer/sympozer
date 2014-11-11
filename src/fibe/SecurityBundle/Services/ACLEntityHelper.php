<?php
namespace fibe\SecurityBundle\Services;

use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity;
use Symfony\Component\Security\Acl\Exception\AclNotFoundException;
use Symfony\Component\Security\Acl\Exception\NoAceFoundException;
use Symfony\Component\Security\Acl\Model\EntryInterface;
use Symfony\Component\Security\Acl\Model\MutableAclInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

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
  const LINK_WITH = 'MainEvent';
  const DEFAULT_REPOSITORY_BUNDLE = 'ERREUR_DE_DEFINITION_ACL';

  /**
   * get an entity in the conf with permission check
   * i.e.
   *   $entity = $this->get('fibe_security.acl_entity_helper')->getEntityACL('CREATE','Topic');
   *   $entity = $this->get('fibe_security.acl_entity_helper')->getEntityACL('EDIT','Person',$id);
   *   $entity = $this->get('fibe_security.acl_entity_helper')->getEntityACL('EDIT','Person',$entity);
   *
   * @param String $action VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
   * @param mixed $entity the entity to get
   *
   * @return mixed the entity to get
   * @throws AccessDeniedException
   *
   */
  public function getEntityACL($action, $entity)
  {
    if (false === $this->securityContext->isGranted($action, $entity))
    {
      throw new AccessDeniedException(
        sprintf(
          ACLHelper::NOT_AUTHORYZED_ENTITY_LABEL,
          $action,
          '#' . $entity->getId()
        )
      );
    }
    return $entity;
  }

  /**
   * get an entity in the conf with permission check
   * get every MainEvent when $repositoryName param is = "MainEvent"
   * i.e.
   *  $entities = $this->get('fibe_security.acl_entity_helper')->getEntitiesACL('EDIT','Topic');
   *
   * @param String $action VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
   * @param String $repositoryName the class name
   *
   * @return array(Entity) entities to get
   */
  public function getEntitiesACL($action, $repositoryName)
  {
    $repositoryFullName = (
      isset(self::$ACLEntityNameArray[$repositoryName]["repositoryBundle"])
        ? self::$ACLEntityNameArray[$repositoryName]["repositoryBundle"]
        : self::DEFAULT_REPOSITORY_BUNDLE
      ) . ':' . $repositoryName;
    $queryBuilder = $this->entityManager->getRepository($repositoryFullName)->createQueryBuilder(
      'entity'
    );

    if ($repositoryName != self::LINK_WITH)
    {
      $this->restrictQueryBuilderByConferenceId($queryBuilder);
    }

    $entities = $queryBuilder->getQuery()->getResult();
    if ("VIEW" == $action && $repositoryName != self::LINK_WITH)
    {
      return $entities;
    }

    $rtn = array();
    foreach ($entities as $entity)
    {
      if (true === $this->securityContext->isGranted($action, $entity))
      {
        $rtn[] = $entity;
      }
    }

    return $rtn;
  }

  /**
   * [getACEByEntity description]
   *
   * @param  [type] $entity     [description]
   * @param  [type] $user       [description]
   * @param  string $returnType all|mask|index|action (all | int binary mask | index of the ace in the acl | readable action i.e. VIEW)
   * @param  [type] $acl        provide acl if you already got it
   *
   * @return [string|int]       the uppest permission
   */

  /**get the  allowed action in a hierarchical way
   *
   * @param mixed $entity the entity to get
   * @param UserInterface|null $user the current user if null
   * @param String $returnType all|mask|index|action (all | int binary mask | index of the ace in the acl | readable action i.e. VIEW)
   * @param null $acl provide acl if you already got it
   *
   * @return String VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
   */
  public function getHierarchicalACEByEntity($entity, UserInterface $user = null, $returnType = "action", $acl = null)
  {
    try
    {
      return $this->getACEByEntity($entity, $user, $returnType, $acl);
    } catch (\Exception $e)
    {
      //other exception than acl/ace not found
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

  /**
   * filter by conferenceId if the repository != this::LINK_WITH
   *
   * @param      $repositoryName
   * @param null $id
   *
   * @return null|object
   */
  protected function getEntitiesInConf($repositoryName, $id = null)
  {
    //TODO ; fix $this->currentMainEvent
    $entity = null;
    if ($id)
    {
      $findOneByArgs = array('id' => $id);
      if ($repositoryName != self::LINK_WITH)
      {
        $findOneByArgs['mainEvent'] = $this->currentMainEvent;
      }
      $entity = $this->entityManager->getRepository($this->getClassNameByRepositoryName($repositoryName))->findOneBy(
        $findOneByArgs
      );
    }
    else
    {
      $className = $this->getClassNameByRepositoryName($repositoryName);
      $entity = new $className();
    }
    if (!$entity)
    {
      $this->throwNotFoundHttpException($repositoryName, $id);
    }

    return $entity;
  }

  /**
   * update the teammate right by repository & id
   * @param  [User] $teammate           the choosen teammate
   * @param  [String] $action          [description]
   * @param  [String] $repositoryName  [description]
   * @param  [type] $id                if not set, update all objects of the repository given linked with the current conf
   */
  protected function updateUserACL($teammate, $action, $repositoryName, $id)
  {
  }

  /**
   * update user acl by entity
   *   /!\ doesn't check owner demoting and own permission change, see updateTeammate for those requirment check
   * @param  [User] $teammate [description]
   * @param  [String] $action[description]
   * @param  [type] $entity  [description]
   */
  protected function performUpdateUserACL($teammate, $action, $entity)
  {
    $entitySecurityIdentity = ObjectIdentity::fromDomainObject($entity);
    $acl = $this->getOrCreateAcl($entitySecurityIdentity, $teammate);
    $this->updateOrCreateAce($acl, $entity, $teammate, $action);
  }

  /**
   * @param $entitySecurityIdentity
   * @param $user
   * @return \Symfony\Component\Security\Acl\Model\MutableAclInterface
   */
  protected function getOrCreateAcl($entitySecurityIdentity, $user)
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
   *  else if he's OPERATOR and he wants to add a member ( catch (NoAceFoundException $e) )
   *        => affect VIEW as default right
   *  else : do nothing
   * @param MutableAclInterface $acl
   * @param $entity
   * @param UserInterface $user
   * @param $action
   */
  private function updateOrCreateAce(MutableAclInterface $acl, $entity, UserInterface $user, $action)
  {
    $currentUserRight = $this->getACEByEntity($entity);
    try
    {
      //get the ace index
      $ace = $this->getACEByEntity($entity, $user, "all", $acl);
      //master permission required to update permissions
      if ($ace['action'] != $action && ("MASTER" == $currentUserRight || "OWNER" == $currentUserRight))
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
      if ("MASTER" == $currentUserRight || "OWNER" == $currentUserRight)
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

  /**get the allowed action
   *
   * @param mixed $entity the entity to get permission on
   * @param UserInterface|null $user the current user if null
   * @param String $returnType all|mask|index|action (all | int binary mask | index of the ace in the acl | readable action i.e. VIEW)
   * @param null $acl provide acl if you already got it
   *
   * @throws \Symfony\Component\Security\Acl\Exception\NoAceFoundException
   * @return String VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
   */
  public function getACEByEntity($entity, UserInterface $user = null, $returnType = "action", $acl = null)
  {
    $entitySecurityIdentity = ObjectIdentity::fromDomainObject($entity);
    $userSecurityIdentity = UserSecurityIdentity::fromAccount($user ? $user : $this->getUser());
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
              'action' => $this->getMask($ace->getMask())
            );
          case 'mask':
            return $ace->getMask();
          case 'index':
            return $index;
          case 'action':
          default:
            return $this->getMask($ace->getMask());
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
}

