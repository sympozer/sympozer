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

class SympozerEntityType extends AbstractType
{

  protected $em;

  function __construct(EntityManager $em)
  {
    $this->em = $em;
  }

  public function buildForm(FormBuilderInterface $builder, array $options)
  {
    $transformer = new SympozerEntityTypeTransformer($this->em, $options);

    $builder->addModelTransformer($transformer);
  }

  public function setDefaultOptions(OptionsResolverInterface $resolver)
  {
    $resolver->setDefaults(array(
      'required' => true,
    ));
    $resolver->setRequired(array(
      'class',
    ));
  }

  public function getParent()
  {
    return 'hidden';
  }

  public function getName()
  {
    return 'sympozer_entity_type';
  }
}