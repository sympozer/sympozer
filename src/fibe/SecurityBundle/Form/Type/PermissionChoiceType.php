<?php
namespace fibe\SecurityBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;
use fibe\SecurityBundle\Services\ACLHelper;

class PermissionChoiceType extends AbstractType
{
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $allMasks = ACLHelper::$MASK_LABELS;

    //remove 'OWNER' choice
    unset($allMasks['OWNER']);
    $resolver->setDefaults(array(
      'choices' => $allMasks
    ));
  }

  public function getParent()
  {
    return 'choice';
  }

  public function getName()
  {
    return 'permission';
  }
}