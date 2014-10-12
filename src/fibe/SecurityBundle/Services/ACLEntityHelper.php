<?php
namespace fibe\SecurityBundle\Services;

use Doctrine\Entity;
use FOS\UserBundle\Model\UserInterface;
use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Acl\Exception\NoAceFoundException;

/**
 * to be used with this class entity must :
 * - have a link to the conference table
 * - be registered in the here present public static $ACLEntityNameArray
 *
 *  Explaination on the role table
 *     http://symfony.com/fr/doc/current/cookbook/security/acl_advanced.html#table-de-permission-integree
 */
class ACLEntityHelper extends ACLHelper
{
  const LINK_WITH = 'MainEvent';
  const DEFAULT_REPOSITORY_BUNDLE = 'ERREUR_DE_DEFINITION_ACL';

  /** @const */
  public static $ACLEntityNameArray = array(
    'MainEvent'            => array(
      'classpath'        => 'fibe\\EventBundle\\Entity',
      'repositoryBundle' => 'fibeEventBundle'
    ),
    'Team'                 => array(
      'classpath' => 'fibe\\SecurityBundle\\Entity',
    ),
    'MobileAppConfig'      => array(
      'classpath' => 'fibe\\MobileAppBundle\\Entity',
    ),
    'Module'               => array(
      'classpath' => 'fibe\\ContentBundle\\Entity',
    ),
    'Event'                => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\EventBundle\\Entity',
      'repositoryBundle' => 'fibeEventBundle'
    ),
    'Location'             => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\ContentBundle\\Entity',
    ),
    'Paper'                => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\ContentBundle\\Entity',
    ),
    'Person'               => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\CommunityBundle\\Entity',
    ),
    'Role'                 => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\ContentBundle\\Entity',
    ),
    'Organization'         => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\CommunityBundle\\Entity',
    ),
    'Topic'                => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\ContentBundle\\Entity',
      'repositoryBundle' => 'fibeContentBundle'
    ),
    'Sponsor'              => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\ContentBundle\\Entity',
    ),
    'SocialServiceAccount' => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\CommunityBundle\\Entity',
    ),
    'Category'             => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\EventBundle\\Entity',
    ),
    'Equipment'            => array(
      'parent'    => 'getMainEvent',
      'classpath' => 'fibe\\ContentBundle\\Entity',
    ),
    'RoleType'             => array(
      'parent'    => 'MainEvent',
      'classpath' => 'fibe\\ContentBundle\\Entity',
    )
  );

  /**
   * get an entity in the conf with permission check
   * i.e.
   *   $entity = $this->get('fibe_security.acl_entity_helper')->getEntityACL('CREATE','Topic');
   *   $entity = $this->get('fibe_security.acl_entity_helper')->getEntityACL('EDIT','Person',$id);
   *   $entity = $this->get('fibe_security.acl_entity_helper')->getEntityACL('EDIT','Person',$entity);
   *
   * @param String $action         VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
   * @param String $repositoryName the class name
   * @param mixed  $entity         the entity to get
   *
   * @return mixed the entity to get
   * @throws AccessDeniedException
   *
   */
  public function getEntityACL($action, $repositoryName, $entity = null)
  {

    if (!is_object($entity))
    {
      $entity = $this->getEntitiesInConf($repositoryName, $entity);
    }
    if (false === $this->securityContext->isGranted($action, $entity))
    {
      throw new AccessDeniedException(
        sprintf(
          ACLHelper::NOT_AUTHORYZED_ENTITY_LABEL,
          $action,
          $repositoryName,
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
   * @param String $action         VIEW|EDIT|CREATE|DELETE|OPERATOR|OWNER|MASTER
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

    if ($repositoryName != ACLEntityHelper::LINK_WITH)
    {
      $this->restrictQueryBuilderByConferenceId($queryBuilder);
    }

    $entities = $queryBuilder->getQuery()->getResult();
    if ("VIEW" == $action && $repositoryName != ACLEntityHelper::LINK_WITH)
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

  public function getACEByRepositoryName($repositoryName, $user = null, $id = null)
  {
    $entity = $this->getEntitiesInConf($repositoryName, $id);

    return $this->getACEByEntity($entity, $user);
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

  /**get the allowed action
   *
   * @param Object             $entity     the entity to get
   * @param UserInterface|null $user       the current user if null
   * @param String             $returnType all|mask|index|action (all | int binary mask | index of the ace in the acl | readable action i.e. VIEW)
   * @param null               $acl        provide acl if you already got it
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
      if ($ace->getSecurityIdentity()->equals($userSecurityIdentity))
      {
        switch ($returnType)
        {
          case 'all':
            return array(
              'mask'   => $ace->getMask(),
              'index'  => $index,
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

  /**
   * @param String $repositoryName registered in the ACLEntityHelper::$ACLEntityNameArray
   *
   * @return String  the full class path
   * @throws EntityACLNotRegisteredException in case entity is not registered in the array
   */
  public function getClassNameByRepositoryName($repositoryName)
  {
    if (!isset(self::$ACLEntityNameArray[$repositoryName]))
    {
      throw new EntityACLNotRegisteredException(
        "Can't get ACL for Entity [" . $repositoryName . "] as it's not registered in ACLEntityHelper::\$ACLEntityNameArray"
      );
    }

    return self::$ACLEntityNameArray[$repositoryName]['classpath'] . '\\' . $repositoryName;
  }

  public static function getRepositoryNameByClassName($className)
  {
    $class = new \ReflectionClass($className);

    if (!isset(self::$ACLEntityNameArray[$class->getShortName()]))
    {
      throw new EntityACLNotRegisteredException(
        "Can't get ACL for Entity [" . $className . "] as it's not registered in ACLEntityHelper::\$ACLEntityNameArray"
      );
    }

    return $class->getShortName();
  }

  /**
   * filter by conferenceId if the repository != this::LINK_WITH
   *
   * @param      $repositoryName
   * @param null $id
   *
   * @return null|object
   */
  private function getEntitiesInConf($repositoryName, $id = null)
  {
    $entity = null;
    if ($id)
    {
      $findOneByArgs = array('id' => $id);
      if ($repositoryName != ACLEntityHelper::LINK_WITH)
      {
        $findOneByArgs['mainEvent'] = $this->getCurrentMainEvent();
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
}


class EntityACLNotRegisteredException extends \RunTimeException
{
}