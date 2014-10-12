<?php

namespace fibe\ContentBundle\Form\Filters;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class LocationFilterType
 *
 * @package fibe\ContentBundle\Form\Filters
 */
class LocationFilterType extends AbstractType
{
  private $user;

  /**
   * Constructor
   *
   * @param $user
   */
  public function __construct($user)
  {
    $this->user = $user;
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id', 'entity', array(
        'class' => 'fibeContentBundle:Location',
        'label' => 'Name',
        'choices' => $this->user->getCurrentMainEvent()->getLocations()->toArray(),
        'required' => false,
        'attr' => array('placeholder' => 'Label')
      ))
      ->add('equipment', 'entity', array(
        'class' => 'fibeContentBundle:Equipment',
        'label' => 'Equipment',
        'required' => false,
        'attr' => array('placeholder' => 'Equipment')

      ))
      ->add('cap_min', 'number', array(
        'label' => 'Cap. min',
        'required' => false,
        'attr' => array('placeholder' => 'min capacity')
      ))
      ->add('cap_max', 'number', array(
        'label' => 'Cap. max',
        'required' => false,
        'attr' => array('placeholder' => 'max capacity')
      ));
  }

  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'csrf_protection' => false,
      'validation_groups' => array('filtering') // avoid NotBlank() constraint-related message
    ));
  }

  /**
   * Returns the name of this type.
   *
   * @return string The name of this type
   */
  public function getName()
  {
    return 'fibe_contentbundle_locationfiltertype';
  }
}
