<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Listener;

use fibe\SecurityBundle\Services\Acl\ACLEntityHelper;
use fibe\SecurityBundle\Services\Acl\ACLHelper;
use FOS\UserBundle\Model\UserInterface;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 * Add data after serialization
 *
 */
class ACLSerializationListener implements EventSubscriberInterface
{
    /** default value for "acl" property added to each serialized entity when the user is logged but have no permission */
    const LOGGED_WITHOUT_RIGHT = "READ";
    private $logger;
    private $aclHelper;
    private $securityContext;

    function __construct(ACLEntityHelper $aclHelper, SecurityContextInterface $securityContext, LoggerInterface $logger = null)
    {
        $this->aclHelper = $aclHelper;
        $this->securityContext = $securityContext;
        $this->logger = $logger;
    }

    /**
     * @inheritdoc
     */
    static public function getSubscribedEvents()
    {
        return array(
            array('event' => 'serializer.post_serialize', 'method' => 'onPostSerialize'),
        );
    }

    /**
     * serialize acl
     * @param ObjectEvent $event
     */
    public function onPostSerialize(ObjectEvent $event)
    {
        $object = $event->getObject();
        if (ACLHelper::isManaged(get_class($object)))
        {
            $user = $this->securityContext->getToken()->getUser();
            if ($user instanceof UserInterface)
            {
                $right = $right = $this->aclHelper->getHierarchicalACEByEntity($object, $user);
                if ($right == null)
                {
                    $right = static::LOGGED_WITHOUT_RIGHT;;
                }
                $event->getVisitor()->addData('acl', $right);
            }
        }
    }
}