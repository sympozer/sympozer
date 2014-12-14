<?php
namespace fibe\RestBundle\Form;

/**
 *
 * @author benoitddlp
 */

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class SympozerExtractIdFormListener implements EventSubscriberInterface
{

    public static function getSubscribedEvents()
    {
        return array(
            FormEvents::PRE_SUBMIT => 'preSubmit',
        );
    }

    public function preSubmit(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        // At this point, $data is an array or an array-like object that already contains the
        // new entries, which were added by the data mapper. The data mapper ignores existing
        // entries, so we need to manually unset removed entries in the collection.

        if (null === $data)
        {
            $data = array();
        }

        if (is_string($data))
        {
            $data = array('id' => $data);
        }

        if (!is_array($data) && !($data instanceof \Traversable && $data instanceof \ArrayAccess))
        {
            throw new UnexpectedTypeException($data, 'array or (\Traversable and \ArrayAccess)');
        }
//        echo "SympozerExtractIdFormListener : onSubmit";
//        \Doctrine\Common\Util\Debug::dump($data);

        $event->setData($data);
    }
}
