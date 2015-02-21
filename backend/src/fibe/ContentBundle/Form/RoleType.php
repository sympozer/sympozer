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
                'type'            => new RoleLabelType(),
                'required'        => true
            ))
            ->add('person', 'sympozer_entity_type', array(
                'type'               => new PersonType(),
                'cascade_persist'    => false,
                'allow_extra_fields' => true,
            ))
            ->add('event', 'sympozer_entity_type', array(
                'type'               => new EventType(),
                'cascade_persist'    => false,
                'allow_extra_fields' => true,
            ))
            ->add('mainEvent', 'sympozer_entity_type', array(
                'type'               => new MainEventType(),
                'cascade_persist'    => false,
            ));
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class'         => 'fibe\ContentBundle\Entity\Role',
            'csrf_protection'    => false,
            'cascade_validation' => true
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
