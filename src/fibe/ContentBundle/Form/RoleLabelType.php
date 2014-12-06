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
class RoleLabelType extends AbstractType
{
  /**
   * {@inheritdoc}
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id')
      ->add('label')
      ->add('description');
//            ->add('mainEvent', 'sympozer_entity_type', array(
//                'type' => new MainEventType(),
//                'required' => 'true',
//            ));
//            ->add('roles', 'collection', array(
//                'type' => new RoleType(),
//                'required' => 'false',
//                'allow_add' => true
//            ));
  }

  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\ContentBundle\Entity\RoleLabel',
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
    return 'fibe_contentbundle_rolelabeltype';
  }
}
