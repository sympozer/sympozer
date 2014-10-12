<?php

  namespace fibe\SecurityBundle\Form;
  use Symfony\Component\Form\FormBuilderInterface;
  use FOS\UserBundle\Form\Type\ProfileFormType as BaseType;

  class ProfileFormType extends BaseType
  {
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

      // add your custom field
      $this->buildUserForm($builder, $options);

      $builder
        ->add('name')
        ->add('twitterScreenName',null,array(
          'required' => false
        ))
      ;
      parent::buildForm($builder, $options);
    }

    public function getName()
    {
      return 'fibe_user_profile';
    }
  }