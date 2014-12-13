<?php
/**
 * Resize a collection form element based on the data sent from the client.
 *
 * Extends the default synfony Listener for 'collection' formType  ResizeFormListener in order
 * to build embedded form 'sympozer_entity_type' instead of the form given in the "type" option.
 * @see ResizeFormListener
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;

use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Symfony\Component\Form\Extension\Core\EventListener\ResizeFormListener;
use Symfony\Component\Form\FormEvent;

class SympozerCollectionTypeListener extends ResizeFormListener
{
    /**
     * {@inheritdoc}
     */
    public function preSetData(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        if (null === $data)
        {
            $data = array();
        }

        if (!is_array($data) && !($data instanceof \Traversable && $data instanceof \ArrayAccess))
        {
            throw new UnexpectedTypeException($data, 'array or (\Traversable and \ArrayAccess)');
        }

        // First remove all rows
        foreach ($form as $name => $child)
        {
            $form->remove($name);
        }

        // Then add all rows again in the correct order
        foreach ($data as $name => $value)
        {
            //here one the difference between super::preSetData
            $form->add($name, 'sympozer_entity_type', array_replace(array(
                    'property_path' => '[' . $name . ']',
                ), $this->options)
            );
        }
    }

    /**
     * {@inheritdoc}
     */
    public function preSubmit(FormEvent $event)
    {
        $form = $event->getForm();
        $data = $event->getData();

        if (null === $data || '' === $data)
        {
            $data = array();
        }

        if (!is_array($data) && !($data instanceof \Traversable && $data instanceof \ArrayAccess))
        {
            throw new UnexpectedTypeException($data, 'array or (\Traversable and \ArrayAccess)');
        }

        // Remove all empty rows
        if ($this->allowDelete)
        {
            foreach ($form as $name => $child)
            {
                if (!isset($data[$name]))
                {
                    $form->remove($name);
                }
            }
        }

        // Add all additional rows
        if ($this->allowAdd)
        {
            foreach ($data as $name => $value)
            {
                if (!$form->has($name))
                {
                    //here one the difference between super::preSetData
                    $form->add($name, 'sympozer_entity_type', array_replace(array(
                            'property_path' => '[' . $name . ']',
                        ), $this->options)
                    );
                }
            }
        }
    }
}
