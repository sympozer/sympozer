<?php

namespace fibe\ContentBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class LocationType
 * @package fibe\ContentBundle\Form
 */
class LocalizationType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id')
            ->add('dtype')
            ->add('label')
            ->add('latitude')
            ->add('longitude')
            ->add('address')
            ->add('streetNumber')
            ->add('street')
            ->add('city')
            ->add('country')
            ->add('state')
            ->add('countryCode')
            ->add('postalCode');
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(
            array(
                'data_class' => 'fibe\ContentBundle\Entity\Localization',
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
        return 'fibe_bundle_contentbundle_localizationtype';
    }
}
