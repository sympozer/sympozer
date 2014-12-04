<?php
/**
 * @author benoitddlp
 * @see http://symfony.com/fr/doc/current/cookbook/form/create_custom_field_type.html
 */
namespace fibe\RestBundle\Form;

use Doctrine\ORM\EntityManager;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class SympozerCollectionType extends AbstractType
{

  protected $em;
  protected $serializer;

  function __construct(EntityManager $em, SerializerInterface $serializer)
  {
    $this->em = $em;
    $this->serializer = $serializer;
  }

  public function buildForm(FormBuilderInterface $builder, array $options)
  {
//    parent::buildForm($builder,$options);
    $transformer = new SympozerCollectionTypeTransformer($this->em, $this->serializer, $options['class']);

//    $builder->add(
//      $builder->create('location')
//        ->addModelTransformer($transformer)
//    );
    $builder->addModelTransformer($transformer);
  }

  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'required' => false,
//      'data_class' => null,
      'allow_add' => true,
      'allow_delete' => true,
    ));
    $resolver->setRequired(array(
      'class',
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