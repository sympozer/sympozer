<?php

namespace fibe\EventBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class MainEventSettingsType extends AbstractType
{
  /**
   * @param FormBuilderInterface $builder
   * @param array $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('label')
      ->add('paperModule')
      ->add('organizationModule')
      ->add('sponsorModule')
      ->add('mainEvent');
  }

  /**
   * @param OptionsResolverInterface $resolver
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\EventBundle\Entity\MainEventSettings'
    ));
  }

  /**
   * @return string
   */
  public function getName()
  {
    return 'fibe_bundle_eventbundle_maineventsettings';
  }
}
