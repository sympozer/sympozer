<?php

namespace fibe\CommunityBundle\Form;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class OrganizationType extends AdditionalInformationsType
{


    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        parent::buildForm($builder, $options);
//      throw new \Exception("OrganizationType buildForm");

//    $builder
//      ->add('sponsors', 'sympozer_collection_type', array(
//        'class' => 'fibeContentBundle:Sponsor',
//        'required' => 'false',
//      ))
        ;
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'fibe\CommunityBundle\Entity\Organization',
            'csrf_protection' => false,
            'cascade_validation' => true,
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'fibe_bundle_communitybundle_organization';
    }

}
