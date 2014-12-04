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
      ->add('person', 'sympozer_entity_type', array(
        'class' => 'fibeCommunityBundle:Person',
        'required' => 'true',
      ))
      ->add('team', 'sympozer_entity_type', array(
        'class' => 'fibeSecurityBundle:Team',
        'required' => 'true',
      ));
  }

  /**
   * @return string
   */
  public function getName()
  {
    return 'fibe_user_teammate';
  }
}