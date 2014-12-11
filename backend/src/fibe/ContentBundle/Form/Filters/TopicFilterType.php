<?php

namespace fibe\ContentBundle\Form\Filters;

use fibe\ContentBundle\Form\PaperType;
use fibe\ContentBundle\Form\TopicType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class TopicFilterType
 *
 * @package fibe\ContentBundle\Form\Filters
 */
class TopicFilterType extends AbstractType
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
          'type' => new TopicType(),
        'label' => 'Name',
        'choices' => $this->user->getCurrentMainEvent()->getTopics()->toArray(),
        'required' => false,
        'attr' => array('placeholder' => 'Label')
      ));
    if ($this->user->getCurrentMainEvent()->getModule()->getPaperModule() == 1)
    {
      $builder
        ->add('paper', 'entity', array(
            'type' => new PaperType(),
          'label' => 'Paper',
          'choices' => $this->user->getCurrentMainEvent()->getPapers()->toArray(),
          'required' => false,
          'attr' => array('placeholder' => 'Publication')
        ));
    }


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
    return 'fibe_content_topicfiltertype';
  }
}
