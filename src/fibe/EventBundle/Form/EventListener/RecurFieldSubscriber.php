<?php

/**
 *
 * @author:  Gabriel BONDAZ <gabriel.bondaz@idci-consulting.fr>
 * @licence: GPL
 *
 */

namespace fibe\EventBundle\Form\EventListener;

use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvents;

class RecurFieldSubscriber implements EventSubscriberInterface
{
  // private $factory;

  public function __construct(FormFactoryInterface $factory)
  {
    //     $this->factory = $factory;
  }

  public static function getSubscribedEvents()
  {
    //     return array(
    //         FormEvents::POST_BIND => 'fixRecurRelation'
    //     );
  }

  public function fixRecurRelation(FormEvent $event)
  {
    //     $data = $event->getData();

    //     $options = $data->getOptions();
    //     if($options && in_array('is_recur', array_keys($options))) {
    //         $data->getIncludedRule()->setIncludedEntity($data);
    //     } else {
    //         //TODO
    //     }
  }
}
