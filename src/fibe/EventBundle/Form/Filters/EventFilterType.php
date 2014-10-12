<?php

namespace fibe\EventBundle\Form\Filters;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ORM\EntityRepository;


/**
 * @TODO comment
 *
 * Class EventFilterType
 * @package fibe\EventBundle\Form\Filters
 */
class EventFilterType extends AbstractType
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
      ->add('summary', 'entity', array(
        'class' => 'fibeEventBundle:VEvent',
        'label' => 'Name',
        'choices' => $this->user->getCurrentMainEvent()->getEvents()->toArray(),
        'required' => false,
        'attr' => array('placeholder' => 'Summary')
      ))
      ->add('location', 'entity', array(
        'class' => 'fibeContentBundle:Location',
        'label' => 'Location',
        'choices' => $this->user->getCurrentMainEvent()->getLocations()->toArray(),
        'empty_data' => null,
        'required' => false,
        'attr' => array('placeholder' => 'Location')
      ))
      ->add('category', 'entity', array(
        'class' => 'fibeEventBundle:Category',
        'label' => 'Category',
        'query_builder' => function (EntityRepository $er)
          {
            return $er->extractQueryBuilder(array());
          },
        'empty_data' => null,
        'required' => false,
        'attr' => array('placeholder' => 'Category')
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
    return 'fibe_eventbundle_eventfiltertype';
  }
}
