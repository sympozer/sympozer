<?php
namespace fibe\SecurityBundle\Services;

use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\SecurityContext;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Acl\Dbal\MutableAclProvider;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\User\UserInterface;

class ACLHelper
{

  /*
   * first %s is entityType and second is id
   */
  const CANNOT_FIND_ENTITY_LABEL = 'Cannot find %s %s';
  /*
   * first %s is action, second is entityType and third is id
   */
  const NOT_AUTHORYZED_ENTITY_LABEL = 'You don\'t have the authorization to perform %s on %s %s';

  /** @const */
  public static $MASKS = array(
    'V' => 'VIEW',
    'E' => 'EDIT',
    // 'C' => 'CREATE',
    // 'D' => 'DELETE',
    // 'U' => 'UNDELETE',
    'O' => 'OPERATOR',
    'M' => 'MASTER',
    'N' => 'OWNER'
  );
  /** @const */
  public static $MASK_LABELS = array(
    'VIEW'     => '[View]',
    'EDIT'     => '[Edit]',
    // 'CREATE' => 'CREATE',
    // 'DELETE' => 'DELETE',
    // 'UNDELETE' => 'UNDELETE',
    'OPERATOR' => '[OPERATOR] Edit/Create/Delete',
    'MASTER'   => '[MASTER] Master can give those permissions to others',
    'OWNER'    => '[OWNER] Owner can promote/demote the Master status'
  );


  protected $securityContext;
  protected $entityManager;
  protected $aclProvider;

  public function __construct(SecurityContext $securityContext, EntityManager $entityManager, MutableAclProvider $aclProvider)
  {
    $this->securityContext = $securityContext;
    $this->entityManager = $entityManager;
    $this->aclProvider = $aclProvider;
  }

  protected function getUser($id = null)
  {
    if ($id)
    {
      return $teamate = $this->entityManager->getRepository('fibeSecurityBundle:User')->find($id);
    }
    else if(($user = $this->securityContext->getToken()->getUser()) instanceof UserInterface)
    {
      return $user;
    }
    else
    {
      throw new UnauthorizedHttpException('negotiate', 'You must be logged in to create a new event');
    }
  }

  protected function getCurrentMainEvent()
  {
    if (!$currentMainEvent = $this->getUser()->getCurrentMainEvent())
    {
      //TODO redirect to the dashboard with parameter if the conf doesn't exist
      $this->throwNotFoundHttpException("current conference");
    }

    return $currentMainEvent;
  }

  protected function restrictQueryBuilderByConferenceId(QueryBuilder $queryBuilder)
  {
    $queryBuilder->andWhere("entity.mainEvent = " . $this->getCurrentMainEvent()->getId());
  }

  protected function restrictQueryBuilderByIds(QueryBuilder $queryBuilder, $ids)
  {
    if (is_string($ids))
    {
      $queryBuilder->andWhere("entity.id IN ($ids)");
    }
    // No ACL found: deny all
    elseif ($ids === false)
    {
      $queryBuilder->andWhere("entity.id = 0");
    }
    elseif ($ids === true)
    {
      // Global-class permission: allow all
    }
  }

  protected function getMask($action)
  {
    if (is_int($action))
    {
      return static::$MASKS[MaskBuilder::getCode($action)];
    }
    else if (!defined($mask = 'Symfony\Component\Security\Acl\Permission\MaskBuilder::MASK_' . $action))
    {
      throw new \RuntimeException("[ACLHelper] Requested action $action is incorrect!");
    }

    return constant($mask);
  }

  protected function getMaskCode($action)
  {
    if (!defined($mask = 'Symfony\Component\Security\Acl\Permission\MaskBuilder::CODE_' . $action))
    {
      throw new \RuntimeException("[ACLHelper] Requested action $action is incorrect!");
    }

    return constant($mask);
  }

  protected function throwNotFoundHttpException($repositoryName, $id = null)
  {
    throw new NotFoundHttpException(sprintf(ACLHelper::CANNOT_FIND_ENTITY_LABEL, $repositoryName, $id ? '#' . $id : ''));
  }
}