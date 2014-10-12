<?php

namespace fibe\SecurityBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;
use fibe\SecurityBundle\Services\ACLHelper;
use fibe\SecurityBundle\Form\Type\PermissionChoiceType;

class ConfPermissionType extends AbstractType
{
  /**
   * @param FormBuilderInterface $builder
   * @param array                $options
   */
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $builder
      ->add('entityLabel', 'hidden')
      ->add('action', new PermissionChoiceType(), array())
      ->add('repositoryName', 'hidden')
      ->add('entityId', 'hidden');
  }

  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'data_class' => 'fibe\SecurityBundle\Entity\ConfPermission',
      'required'   => true,
      'options'    => array(
        'data_class' => 'fibe\SecurityBundle\Entity\ConfPermission',
        'required'   => true,
      )
    ));
  }

  /**
   * @return string
   */
  public function getName()
  {
    return 'fibe_conf_permission';
  }
}