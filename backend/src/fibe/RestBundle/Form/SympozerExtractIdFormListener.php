<?php
namespace fibe\RestBundle\Form;

/**
 *
 * @author benoitddlp
 */

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class SympozerExtractIdFormListener implements EventSubscriberInterface
{
    const TO_IGNORE = 'ignore';

    public static function getSubscribedEvents()
    {
        return array(
            FormEvents::PRE_SUBMIT => 'preSubmit',
            //            FormEvents::POST_SET_DATA => 'preSetData',
        );
    }

    public function preSubmit(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        // At this point, $data is an array or an array-like object that already contains the
        // new entries, which were added by the data mapper.

        if (null === $data)
        {
            if ($form->isRequired())
            {
                //TODO put this to the correct field
                $form->addError(new FormError('field required'));

                return;
            }
            $data = array("id" => self::TO_IGNORE);
        }

        if (is_string($data))
        {
            $data = array('id' => $data);
        }

        if (!is_array($data) && !($data instanceof \Traversable && $data instanceof \ArrayAccess))
        {
            throw new UnexpectedTypeException($data, 'array or (\Traversable and \ArrayAccess)');
        }

        $event->setData($data);
    }

    public function preSetData(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        echo "\n\nentity preSetData";
        \Doctrine\Common\Util\Debug::dump($data);

        $event->setData($data);
    }
}
