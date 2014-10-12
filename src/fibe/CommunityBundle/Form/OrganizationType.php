<?php

namespace fibe\CommunityBundle\Form;

use fibe\CommunityBundle\Entity\AdditionalInformations;
use JMS\Serializer\Tests\Fixtures\Person;
use Symfony\Component\Form\AbstractType;
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
    $builder
      ->add('label')
      ->add('sponsors', 'entity', array(
        'class' => 'fibeContentBundle:Sponsor',
        'required' => 'false',
        'multiple' => true,
      ));
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
