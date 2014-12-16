<?php

namespace fibe\EventBundle\Form;

use fibe\ContentBundle\Form\PaperType;
use fibe\ContentBundle\Form\RoleType;
use fibe\ContentBundle\Form\TopicType;
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
                'type' => new CategoryType(),
                'required' => true,
            ))
            ->add('mainEvent', 'sympozer_entity_type', array(
                'type' => new MainEventType(),
                'required' => true,
                'cascade_persist' => false,
                'allow_extra_fields' => true,
            ))
            ->add('papers', 'sympozer_collection_type', array(
                'type' => new PaperType(),
                'required' => 'false'
            ))
            ->add('roles', 'sympozer_collection_type', array(
                'type' => new RoleType(),
                'required' => 'false'
            ))
            ->add('topics', 'sympozer_collection_type', array(
                'type' => new TopicType(),
                'required' => 'false'
            ))
        ;

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
