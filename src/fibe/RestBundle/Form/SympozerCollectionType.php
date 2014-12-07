<?php
/**
 * @author benoitddlp
 * @see http://symfony.com/fr/doc/current/cookbook/form/create_custom_field_type.html
 */
namespace fibe\RestBundle\Form;

use Doctrine\ORM\EntityManager;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class SympozerCollectionType extends AbstractType
{

  protected $em;

  function __construct(EntityManager $em)
  {
    $this->em = $em;
  }

  public function buildForm(FormBuilderInterface $builder, array $options)
  {

//    parent::buildForm($builder,$options);
    $transformer = new SympozerCollectionTypeTransformer($this->em, $options);
    $builder->addModelTransformer($transformer);

    //build given form type
    /** @var \Symfony\Component\Form\FormTypeInterface $formType */
    $formType = $options['type'];
    $formType->buildForm($builder, $options);
  }

  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'required' => false,
      'allow_add' => true,
      'allow_delete' => true,
    ));
    $resolver->setRequired(array(
      'type',
    ));
  }

  public function getParent()
  {
    return 'collection';
  }

  public function getName()
  {
    return 'sympozer_collection_type';
  }
}