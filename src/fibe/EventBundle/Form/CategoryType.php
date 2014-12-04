<?php


namespace fibe\EventBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class CategoryType extends AbstractType
{
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('id')
      ->add('label')
      ->add('description')
      ->add('color')
      ->add('categoryVersions', 'sympozer_collection_type', array(
        'class' => 'fibeEventBundle:CategoryVersion',
        'required' => 'false'
      ));
  }

  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\EventBundle\Entity\Category',
      'csrf_protection' => false
    ));
  }

  public function getName()
  {
    return 'fibe_eventbundle_category_type';
  }
}
