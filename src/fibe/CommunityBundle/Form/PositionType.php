<?php

namespace fibe\CommunityBundle\Form;


use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class OrganizationVersionType extends AdditionalInformationsType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('label')
            ->add('position')
            ->add('person', 'entity', array(
                'class' => 'fibeCommunityBundle:Person',
                'required' => 'false',
                'multiple' => false,
            ))
            ->add('organization', 'entity', array(
                'class' => 'fibeCommunityBundle:Organization',
                'required' => 'false',
                'multiple' => false,
            ));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\CommunityBundle\Entity\Position',
            'csrf_protection' => false,
            'cascade_validation' => true,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'fibe_bundle_communitybundle_organizationversion';
    }

}
