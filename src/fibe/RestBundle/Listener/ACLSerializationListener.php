<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Listener;

use fibe\SecurityBundle\Services\ACLEntityHelper;
use fibe\SecurityBundle\Services\ACLHelper;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use Psr\Log\LoggerInterface;

/**
 * Add data after serialization
 *
 */
class ACLSerializationListener implements EventSubscriberInterface
{
  private $logger;
  private $aclHelper;

  function __construct(ACLEntityHelper $aclHelper, LoggerInterface $logger = null)
  {
    $this->aclHelper = $aclHelper;
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
   * Add acl field
   * @param ObjectEvent $event
   */
  public function onPostSerialize(ObjectEvent $event)
  {
    $object = $event->getObject();
    if (ACLHelper::isManaged(get_class($object)))
//    if (isset(ACLHelper::$ACLEntityNameArray[ACLHelper::getRepositoryNameByClassName(get_class($object))]))
    {
      $event->getVisitor()->addData('acl', $this->aclHelper->getHierarchicalACEByEntity($object));
    }
//    try
//    {
//    } catch (UnauthorizedHttpException $e)
//    {
//      //user not logged : just ignore
//      if (null !== $this->logger)
//      {
//        $this->logger->debug("[ACLSerializationListener]" . $e->getMessage(),array('acl'));
//      }
//    } catch (\Exception $e)
//    {
//      //no ace / acl : just ignore
//      if (null !== $this->logger)
//      {
//        $this->logger->debug("[ACLSerializationListener]" . $e->getMessage(),array('acl'));
//      }
//    }
  }
}