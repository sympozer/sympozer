<?php

namespace fibe\SecurityBundle\Form;

use FOS\UserBundle\Form\Type\RegistrationFormType as BaseType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * @TODO    comment
 *
 * Class RegistrationFormType
 * @package fibe\SecurityBundle\Form
 */
class RegistrationFormType extends BaseType
{
  /**
   * @param FormBuilderInterface $builder
   * @param array                $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    parent::buildForm($builder, $options);

    // add your custom field
    $builder
      ->add('langage');
  }

  /**
   * @return string
   */
  public function getName()
  {
    return 'fibe_user_registration';
  }
}