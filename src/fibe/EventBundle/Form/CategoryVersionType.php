<?php


namespace fibe\EventBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CategoryVersionType extends AbstractType
{
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id')
      ->add('label')
      ->add('description')
      ->add('color')
      ->add('mainEvent', 'sympozer_entity_type', array(
        'class' => 'fibeEventBundle:MainEvent',
        'required' => 'true'
      ))
      ->add('events', 'sympozer_collection_type', array(
        'class' => 'fibeEventBundle:Event',
        'required' => 'false'
      ))
      ->add('category', 'sympozer_entity_type', array(
        'class' => 'fibeEventBundle:Category',
        'required' => 'true'
      ));

  }

  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\EventBundle\Entity\CategoryVersion',
      'csrf_protection' => false
    ));
  }

  public function getName()
  {
    return 'fibe_eventbundle_categoryversion_type';
  }
}
