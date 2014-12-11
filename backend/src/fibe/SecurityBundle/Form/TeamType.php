<?php

namespace fibe\SecurityBundle\Form;

use fibe\EventBundle\Form\MainEventType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class TeamType extends AbstractType
{

  /**
   * @param FormBuilderInterface $builder
   * @param array $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id')
      ->add('mainEvent', 'sympozer_entity_type', array(
        'type' => new MainEventType(),
          'cascade_persist' => false,
          'allow_extra_fields' => true,
      ))
      ->add('team', 'sympozer_collection_type', array(
        'type' => new TeammateType(),
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