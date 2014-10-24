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
        parent::buildForm($builder, $options);
        $builder
            ->add('label')
            ->add('sponsors', 'entity', array(
                'class' => 'fibeContentBundle:Sponsor',
                'required' => 'false',
                'multiple' => true,
            ))
            ->add('organizationVersionOwner', 'entity', array(
                'class' => 'fibeCommunityBundle:Person',
                'required' => 'true',
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
            'data_class' => 'fibe\CommunityBundle\Entity\OrganizationVersion',
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
