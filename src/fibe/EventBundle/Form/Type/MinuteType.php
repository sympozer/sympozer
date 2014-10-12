<?php

namespace fibe\EventBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use fibe\EventBundle\Form\DataTransformer\ArrayToStringTransformer;

// use fibe\EventBundle\Entity\Recur;

class MinuteType extends AbstractType
{
  public function buildForm(FormBuilderInterface $builder, array $options)
  {
  }

  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    //     $resolver->setDefaults(array(
    //         'choices'         => Recur::getMinute(),
    //         'multiple'        => true,
    //         'expanded'        => false,
    //         'invalid_message' => 'The selected minute does not exist',
    //     ));
  }

  public function getParent()
  {
    //     return 'choice';
  }

  public function getName()
  {
    //     return 'minute';
  }
}
