<?php

namespace fibe\CommunityBundle\Form;

use fibe\ContentBundle\Form\LocalizationType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

abstract class AdditionalInformationsType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id')
            ->add('dtype')
            ->add('label')
            ->add('website')
            ->add('country')
            ->add('description')
            ->add('img')
            ->add('description')
            ->add('localization', 'sympozer_entity_type', array(
                'type' => new LocalizationType(),
                'required' => true
            ))
        ;

    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\CommunityBundle\Entity\AdditionalInformations',
            'csrf_protection' => false,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'fibe_communitybundle_additionalinformations';
    }
}
