<?php

namespace fibe\CommunityBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class SocialServiceAccountType
 *
 * @package fibe\CommunityBundle\Form
 */
class SocialServiceAccountType extends AbstractType
{
  /**
   * {@inheritdoc}
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('accountName');
//      ->add('socialService', 'entity', array(
//        'class'    => 'fibecommunityBundle:SocialService',
//        'label'    => 'Social service',
//        'required' => true));
  }

  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\CommunityBundle\Entity\SocialServiceAccount'
    ));
  }

  /**
   * Returns the name of this type.
   *
   * @return string The name of this type
   */
  public function getName()
  {
    return 'fibe_communitybundle_socialserviceaccounttype';
  }
}
