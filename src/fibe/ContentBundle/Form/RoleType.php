<?php

namespace fibe\ContentBundle\Form;

use Doctrine\ORM\EntityRepository;
use fibe\CommunityBundle\Form\PersonType;
use fibe\EventBundle\Form\EventType;
use fibe\EventBundle\Form\MainEventType;
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
      ->add('label')
      ->add('person', 'entity', array(
        'class' => 'fibeCommunityBundle:Person',
        'required' => 'false',
        'multiple' => false,
      ))
      ->add('event', 'entity', array(
        'class' => 'fibeEventBundle:Event',
        'required' => 'false',
        'multiple' => false,
      ))
      ->add('roleLabelVersion', 'entity', array(
        'class' => 'fibeContentBundle:RoleLabelVersion',
        'required' => 'false',
        'multiple' => false,
      ))
      ->add('mainEvent', 'entity', array(
        'class' => 'fibeEventBundle:MainEvent',
        'required' => 'true',
        'multiple' => false,
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
