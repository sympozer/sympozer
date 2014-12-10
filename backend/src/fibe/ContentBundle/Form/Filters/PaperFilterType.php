<?php

namespace fibe\ContentBundle\Form\Filters;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class PaperFilterType
 *
 * @package fibe\ContentBundle\Form\Filters
 */
class PaperFilterType extends AbstractType
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
        'class' => 'fibeContentBundle:Paper',
        'label' => 'Title',
        'choices' => $this->user->getCurrentMainEvent()->getPapers()->toArray(),
        'required' => false,
        'attr' => array('placeholder' => 'Title')
      ))
      ->add('author', 'entity', array(
        'class' => 'fibeCommunityBundle:Person',
        'label' => 'Author',
        'choices' => $this->user->getCurrentMainEvent()->getPersons()->toArray(),
        'required' => false,
        'attr' => array('placeholder' => 'Author')
      ))
      ->add('topic', 'entity', array(
        'class' => 'fibeContentBundle:Topic',
        'label' => 'Subject',
        'choices' => $this->user->getCurrentMainEvent()->getTopics()->toArray(),
        'required' => false,
        'attr' => array('placeholder' => 'Topic')

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
   * Return the name of this type.
   *
   * @return string The name of this type
   */
  public function getName()
  {
    return 'fibe_contentbundle_paperfiltertype';
  }
}
