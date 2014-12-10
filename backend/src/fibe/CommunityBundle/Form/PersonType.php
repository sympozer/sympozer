<?php

namespace fibe\CommunityBundle\Form;

use fibe\RestBundle\Form\PatchSubscriber;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class PersonType
 *
 * @package fibe\CommunityBundle\Form
 */
class PersonType extends AdditionalInformationsType
{

  /**
   * {@inheritdoc}
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    parent::buildForm($builder, $options);
    $builder
      ->add('firstName')
      ->add('familyName')
      ->add('email', 'email')
      ->add('positions', 'sympozer_collection_type', array(
        'type' => new PositionType(),
        'required' => false
      ))
//
//      ->add('papers', 'sympozer_collection_type', array(
//        'class' => new PaperType(),
//        'required' => false
//      ))
//      ->add('roles', 'sympozer_collection_type', array(
//        'class' => new RoleType(),
//        'required' => false
//      ))
//      ->add('teammates', 'sympozer_collection_type', array(
//        'class' => new TeammateType(),
//        'required' => false
//      ))
//      ->add('firstName', 'text', array('label' => "First name"))
//      ->add('familyName', 'text', array('label' => "Family Name"))
//      ->add('email', 'text', array('required' => false))
//      ->add('age', 'text', array('required' => false))
//      ->add('page', 'text', array('required' => false, 'label' => 'Homepage'))
//      ->add('img', 'text', array('required' => false, 'label' => 'Image (external url)'))
//      ->add('openId', 'text', array('required' => false))
//      ->add('description', 'textarea', array('required' => false, 'label' => 'Description'))
//      // ->add('nick', 'text', array('required' => false))
//      ->add('organizations', 'entity', array(
//        'class'    => 'fibeCommunityBundle:Organization',
//        'label'    => 'Organizations',
//        'choices'  => $this->user->getCurrentMainEvent()->getOrganizations()->toArray(),
//        'required' => false,
//      ))
//      ->add('papers', 'entity', array(
//        'class'    => 'fibeCommunityBundle:Paper',
//        'label'    => 'Publications',
//        'choices'  => $this->user->getCurrentMainEvent()->getPapers()->toArray(),
//        'required' => false,
//        'multiple' => true
//      ))
//      ->add('accounts', 'collection', array('type'         => new SocialServiceAccountType(),
//                                            'allow_add'    => true,
//                                            'allow_delete' => true))
    ;
  }

  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\CommunityBundle\Entity\Person',
      'csrf_protection' => false,
    ));
  }

  /**
   * Returns the name of this type.
   *
   * @return string The name of this type
   */
  public function getName()
  {
    return 'fibe_communitybundle_persontype';
  }
}
