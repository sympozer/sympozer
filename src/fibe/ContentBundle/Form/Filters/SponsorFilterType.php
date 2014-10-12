<?php

namespace fibe\ContentBundle\Form\Filters;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class SponsorFilterType
 *
 * @package fibe\ContentBundle\Form\Filters
 */
class SponsorFilterType extends AbstractType
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
      ->add('id', 'entity', [
        'class' => 'fibeContentBundle:Sponsor',
        'label' => 'Name',
        'choices' => $this->user->getCurrentMainEvent()->getSponsors()->toArray(),
        'required' => false,
        'attr' => ['placeholder' => 'Label']
      ]);
  }


  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults([
      'csrf_protection' => false,
      'validation_groups' => array('filtering') // avoid NotBlank() constraint-related message
    ]);
  }

  /**
   * Returns the name of this type.
   *
   * @return string The name of this type
   */
  public function getName()
  {
    return 'fibe_content_sponsorfiltertype';
  }
}
