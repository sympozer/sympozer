<?php
namespace fibe\RestBundle\Form;

/**
 *  form Listener used by SympozerEntityType
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
    /**
     * This tag is put on id field of an entity that must be ignored
     *  i.e. if it's empty
     */
    const TO_IGNORE = 'ignore';

    public static function getSubscribedEvents()
    {
        return array(
            FormEvents::PRE_SUBMIT => 'preSubmit'
        );
    }

    /**
     * Transforms the user input into an array like object
     * enabling a link between entities to be performed
     * by sending directly an id. like : "key : <id>"
     *
     * This event is fired before the Transform step
     *
     * @param FormEvent $event
     * @throws \Symfony\Component\Form\Exception\UnexpectedTypeException
     */
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
}
