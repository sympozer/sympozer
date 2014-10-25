<?php

namespace fibe\ContentBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class LocationType
 * @package fibe\ContentBundle\Form
 */
class EventLocationType extends LocationType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
        $builder
            ->add('mainEvent', 'entity', array(
                'class' => 'fibeEventBundle:MainEvent',
                'required' => 'true',
                'multiple' => false,
            ))
            ->add('events', 'entity', array(
                'class' => 'fibeEventBundle:Event',
                'required' => 'false',
                'multiple' => true,
            ));
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
