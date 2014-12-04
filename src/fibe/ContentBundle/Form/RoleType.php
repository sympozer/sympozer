<?php

namespace fibe\ContentBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class RoleType
 *
 * @package fibe\ContentBundle\Form
 */
class RoleType extends AbstractType
{

  /**
   * {@inheritdoc}
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id')
      ->add('label')
      ->add('person', 'sympozer_entity_type', array(
        'class' => 'fibeCommunityBundle:Person',
        'required' => 'false'
      ))
      ->add('event', 'sympozer_entity_type', array(
        'class' => 'fibeEventBundle:Event',
        'required' => 'false'
      ))
      ->add('roleLabelVersion', 'sympozer_entity_type', array(
        'class' => 'fibeContentBundle:RoleLabelVersion',
        'required' => 'false'
      ))
      ->add('mainEvent', 'sympozer_entity_type', array(
        'class' => 'fibeEventBundle:MainEvent',
        'required' => 'true'
      ));
  }

  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\ContentBundle\Entity\Role',
      'csrf_protection' => false
    ));
  }

  /**
   * Returns the name of this type.
   *
   * @return string The name of this type
   */
  public function getName()
  {
    return 'fibe_contentbundle_roletype';
  }
}
