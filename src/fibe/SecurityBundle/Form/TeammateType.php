<?php

namespace fibe\SecurityBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class TeammateType extends AbstractType
{

  /**
   * @param FormBuilderInterface $builder
   * @param array $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id')
      ->add('person', 'entity', array(
        'class' => 'fibeCommunityBundle:Person',
        'required' => 'true',
        'multiple' => false,
      ))
      ->add('team', 'entity', array(
        'class' => 'fibeSecurityBundle:Team',
        'required' => 'true',
        'multiple' => false,
      ));
  }

  /**
   * @return string
   */
  public function getName()
  {
    return 'fibe_user_conf_permission';
  }
}