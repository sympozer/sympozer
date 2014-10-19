<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Listener;

use fibe\SecurityBundle\Services\ACLEntityHelper;
use Psr\Log\LoggerInterface;
use JMS\Serializer\EventDispatcher\EventSubscriberInterface;
use JMS\Serializer\EventDispatcher\ObjectEvent;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

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

  public function onPostSerialize(ObjectEvent $event)
  {
    $object = $event->getObject();
    try
    {
      $event->getVisitor()->addData('acl',$this->aclHelper->getACEByEntity($object));
    } catch(UnauthorizedHttpException $e)
    {
      //user not logged : just ignore
      if (null !== $this->logger) {
        $this->logger->debug($e->getMessage());
      }
    } catch(\Exception $e)
    {
      //no ace / acl : just ignore
      if (null !== $this->logger) {
        $this->logger->debug($e->getMessage());
      }
    }
  }
}