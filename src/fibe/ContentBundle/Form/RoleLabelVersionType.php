<?php

namespace fibe\ContentBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class RoleTypeType
 *
 * @package fibe\ContentBundle\Form
 */
class RoleLabelVersionType extends AbstractType
{
  /**
   * {@inheritdoc}
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id')
      ->add('label')
      ->add('description')
      ->add('roleLabel', 'sympozer_entity_type', array(
        'class' => 'fibeContentBundle:RoleLabel',
        'required' => 'true'
      ))
      ->add('roles', 'sympozer_collection_type', array(
        'class' => 'fibeContentBundle:Role',
        'required' => 'true'
      ))
      ->add('mainEvent', 'sympozer_entity_type', array(
        'class' => 'fibeEventBundle:MainEvent',
      ));
  }

  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\ContentBundle\Entity\RoleLabelVersion',
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
    return 'fibe_contentbundle_rolelabelversiontype';
  }
}
