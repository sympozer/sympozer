<?php
namespace fibe\SecurityBundle\Services\Acl;

use Doctrine\ORM\EntityManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Acl\Dbal\MutableAclProvider;
use Symfony\Component\Security\Acl\Exception\AclNotFoundException;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;

abstract class ACLHelper
{
    /**
     * get label from code
     * @const
     */
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

    /**
     * get Description from label
     * @const
     */
    public static $MASK_LABELS = array(
        'VIEW' => '[View]',
        'EDIT' => '[Edit]',
        // 'CREATE' => 'CREATE',
        // 'DELETE' => 'DELETE',
        // 'UNDELETE' => 'UNDELETE',
        'OPERATOR' => '[OPERATOR] Edit/Create/Delete',
        'MASTER' => '[MASTER] Master can give those permissions to others',
        'OWNER' => '[OWNER] Owner can promote/demote the Master status and delete the mainEvent'
    );


    /**
     * hierarchical tree
     *  when AclInheriatanceVoter tries to vote,
     *  it visits the tree to its top until it finds an ACL.
     *  If not, nothing is returned
     *
     * @const
     */
    public static $ACLEntityNameArray = array(
        'MainEvent' => array(
            'classpath' => 'fibe\\EventBundle\\Entity',
            'repositoryBundle' => 'fibeEventBundle'
        ),
        'Team' => array(
            'parent' => 'getMainEvent',
            'classpath' => 'fibe\\SecurityBundle\\Entity',
        ),
        'Teammate' => array(
            'parent' => 'getTeam',
            'classpath' => 'fibe\\SecurityBundle\\Entity',
        ),
        'Event' => array(
            'parent' => 'getMainEvent',
            'classpath' => 'fibe\\EventBundle\\Entity',
            'repositoryBundle' => 'fibeEventBundle'
        ),
        'Location' => array(
            'parent' => 'getMainEvent',
            'classpath' => 'fibe\\ContentBundle\\Entity',
        ),
        'Paper' => array(
            'parent' => 'getMainEvent',
            'classpath' => 'fibe\\ContentBundle\\Entity',
        ),
        'Person' => array(
            'classpath' => 'fibe\\CommunityBundle\\Entity',
        ),
        'Role' => array(
            'parent' => 'getMainEvent',
            'classpath' => 'fibe\\ContentBundle\\Entity',
        ),
        //        'RoleLabel'           => array(
        //            'parent'    => 'getRoles',
        //            'classpath' => 'fibe\\ContentBundle\\Entity',
        //        ),
        //    'Topic' => array(
        //      'parent' => 'getMainEvent',
        //      'classpath' => 'fibe\\ContentBundle\\Entity',
        //      'repositoryBundle' => 'fibeContentBundle'
        //    ),
        'Sponsor' => array(
            'parent' => 'getMainEvent',
            'classpath' => 'fibe\\ContentBundle\\Entity',
        ),
        //    'Equipment' => array(
        //      'parent' => 'getMainEvent',
        //      'classpath' => 'fibe\\ContentBundle\\Entity',
        //    ),
    );

    /** @var EntityManager */
    protected $entityManager;
    /** @var MutableAclProvider $aclProvider */
    protected $aclProvider;
    /** @var LoggerInterface $logger */
    protected $logger;

    /**
     *  return the parent in the hierarchical tree for the given entity
     * @param $entity mixed   the entity to get the parent
     * @throws \LogicException
     * @return mixed|null     the parent or null
     */
    public static function getParent($entity)
    {
        $ACLEntityInfo = self::isManaged(get_class($entity));
        if ($ACLEntityInfo && isset($ACLEntityInfo['parent']))
        {
            $parent = call_user_func_array(array($entity, $ACLEntityInfo['parent']), array());
            if (null == $parent)
            {
                throw new \LogicException("[ACL] Parent " . $ACLEntityInfo['parent'] . " is null for " . get_class($entity) . ".");
            }

            return $parent;
        }

        return null;
    }

    /**
     * get $ACLEntityNameArray value for the giver classname
     * @param $classname
     * @return array | false
     */
    public static function isManaged($classname)
    {

        $class = new \ReflectionClass($classname);

        if (isset(self::$ACLEntityNameArray[$class->getShortName()]))
        {
            try
            {
                if (isset(self::$ACLEntityNameArray[$class->getShortName()]))
                {
                    return self::$ACLEntityNameArray[$class->getShortName()];
                }
            }
            catch (AclNotFoundException $e)
            {
                //return false if the entity is not managed with acl
            }
        }

        return false;
    }

    static function getClassNameFromShortClassName($shortClassName)
    {
        if (isset(self::$ACLEntityNameArray[$shortClassName]))
        {
            return self::$ACLEntityNameArray[$shortClassName]["classpath"] . "\\" . $shortClassName;
        }
        throw new \Exception("'$shortClassName' is not configured to be imported");
    }

    /** inject service
     * @param MutableAclProvider $aclProvider
     */
    public function setAclProvider(MutableAclProvider $aclProvider)
    {
        $this->aclProvider = $aclProvider;
    }

    /**
     * inject service
     * @param EntityManager $entityManager
     */
    public function setEntityManager(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /*****************************           setter service injector             **********************************/

    /**
     * inject service
     * @param LoggerInterface $logger
     */
    public function setLogger($logger)
    {
        $this->logger = $logger;
    }

    protected function getMask($action)
    {
        if (is_int($action))
        {
            return $action;
        }
        else if (!defined($mask = 'Symfony\Component\Security\Acl\Permission\MaskBuilder::MASK_' . $action))
        {
            throw new \RuntimeException("[ACLHelper] Requested action $action is incorrect!");
        }

        return constant($mask);
    }

    protected function getAction($mask)
    {
        if (is_int($mask))
        {
            return static::$MASKS[MaskBuilder::getCode($mask)];
        }

        return constant($mask);
    }
}