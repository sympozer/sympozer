<?php

namespace fibe\ContentBundle\Form;

use fibe\CommunityBundle\Form\PersonType;
use fibe\EventBundle\Form\EventType;
use fibe\EventBundle\Form\MainEventType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class RoleType
 *
 * @package fibe\ContentBundle\Form
 */
class RoleType extends AbstractType
{

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id')
            ->add('label')
            ->add('roleLabel', 'sympozer_entity_type', array(
                'cascade_persist' => false,
                'type' => new RoleLabelType(),
                'required' => false
            ))
            ->add('person', 'sympozer_entity_type', array(
                'type' => new PersonType(),
                'required' => false,
                'cascade_persist' => false,
                'allow_extra_fields' => true,
            ))
            ->add('event', 'sympozer_entity_type', array(
                'type' => new EventType(),
                'required' => false,
                'cascade_persist' => false,
                'allow_extra_fields' => true,
            ))
            ->add('mainEvent', 'sympozer_entity_type', array(
                'type' => new MainEventType(),
                'required' => true,
                'cascade_persist' => false,
                'allow_extra_fields' => true,
            ));
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\ContentBundle\Entity\Role',
            'csrf_protection' => false
        ));
    }

    /**
     * Returns the name of this type.
     *
     * @return string The name of this type
     */
    public function getName()
    {
        return 'fibe_contentbundle_roletype';
    }
}
