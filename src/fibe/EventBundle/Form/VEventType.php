<?php

namespace fibe\EventBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class VEventType extends AbstractType
{

  protected $categoriesLevels;

  public function __construct($cat)
  {
    $this->categoriesLevels = $cat;
  }

  /**
   * @param FormBuilderInterface $builder
   * @param array $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id')
      ->add('label')
      ->add('twitter')
      ->add('facebook')
      ->add('youtube')
      ->add('priority')
      ->add('startAt', 'datetime', array(
        'widget' => 'single_text',
      ))
      ->add('endAt', 'datetime', array(
        'widget' => 'single_text',
      ))
      ->add('description')
      ->add('comment')
      ->add('url')
      ->add('dtype')
      ->add('sponsors', 'sympozer_collection_type', array(
        'class' => 'fibeContentBundle:Sponsor',
        'required' => 'false'
      ))
      ->add('location', 'sympozer_entity_type', array(
        'class' => 'fibeContentBundle:Location',
        'required' => 'true',
      ));
  }

  /**
   * @param OptionsResolverInterface $resolver
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\VEventBundle\Entity\VEvent',
      'csrf_protection' => false
    ));
  }

  /**
   * @return string
   */
  public function getName()
  {
    return 'fibe_eventbundle_vevent';
  }
}
