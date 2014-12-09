<?php

namespace fibe\EventBundle\Form;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class EventType extends VEventType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)

    {
        parent::buildForm($builder, $options);
        $builder
            ->add('category', 'sympozer_entity_type', array(
                'type' => new CategoryVersionType(),
                'required' => 'true',
            ))
            ->add('mainEvent', 'sympozer_entity_type', array(
                'type' => new MainEventType(),
                'required' => 'true',
            ))
            ->add('papers', 'sympozer_collection_type', array(
                'class' => 'fibeContentBundle:Paper',
                'required' => 'false'
            ))
            ->add('roles', 'sympozer_collection_type', array(
                'class' => 'fibeContentBundle:Role',
                'required' => 'false'
            ))
            ->add('topics', 'sympozer_collection_type', array(
                'class' => 'fibeContentBundle:Topic',
                'required' => 'false'
            ));

    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\EventBundle\Entity\Event',
            'csrf_protection' => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'fibe_eventbundle_event';
    }
}
