<?php

namespace fibe\ContentBundle\Form;

use fibe\EventBundle\Form\MainEventType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class LocationType
 * @package fibe\ContentBundle\Form
 */
class LocationType extends LocalizationType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
        $builder
            ->add('capacity')
            ->add('description')
            ->add('accesibility')
            ->add('mainEvent', 'sympozer_entity_type', array(
                'type' => new MainEventType(),
                'cascade_persist' => false,
                'allow_extra_fields' => true
            ))
            ->add('equipments', 'sympozer_collection_type', array(
                'type' => new EquipmentType(),
                'required' => false
            ))
//            ->add('events', 'sympozer_collection_type', array(
//                'type' => new VEventType(),
//                'required' => false,
//            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(
            array(
                'data_class' => 'fibe\ContentBundle\Entity\Location',
                'csrf_protection' => false
            )
        );
    }

    /**
     * Returns the name of this type.
     *
     * @return string The name of this type
     */
    public function getName()
    {
        return 'fibe_bundle_contentbundle_locationtype';
    }
}
