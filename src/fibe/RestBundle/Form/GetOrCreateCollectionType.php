<?php

namespace fibe\RestBundle\Form;

use Doctrine\Common\Persistence\ObjectManager;
use fibe\RestBundle\Form\DataTransformer\GetOrCreateCollectionTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class GetOrCreateType
 * Form type used to tweak find or create when validating a form rest style on a specific collection
 * @package fibe\RestBundle\Form
 */
class GetOrCreateCollectionType extends AbstractType
{
  /**
   * @var ObjectManager
   */
  private $om;

  /**
   * @param ObjectManager $om
   */
  public function __construct(ObjectManager $om)
  {
    $this->om = $om;
  }

  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $transformer = new GetOrCreateCollectionTransformer($this->om,$options['uniqField']);
    $builder->addModelTransformer($transformer);
  }

  /**
   * {@inheritdoc}
   */
  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver
      ->setDefaults(array(
        'allow_add' => true,
        'allow_delete' => true
      ))
    ;
    $resolver->setRequired(array(
      'uniqField',
    ));
  }

  public function getParent()
  {
    return 'collection';
  }

  /**
   * Returns the name of this type.
   *
   * @return string The name of this type
   */
  public function getName()
  {
    return 'fibe_restbundle_collection_type';
  }
}
