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
      ->add('sponsors', 'sympozer_collection_type', array(
        'class' => 'fibeContentBundle:Sponsor',
        'required' => 'false',
      ))
      ->add('organizationVersionOwner', 'sympozer_entity_type', array(
        'class' => 'fibeCommunityBundle:Person',
        'required' => 'true',
      ))
//            ->add('organizationVersionOwner', new PersonType())
      ->add('organization', 'sympozer_entity_type', array(
        'class' => 'fibeCommunityBundle:Organization',
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
