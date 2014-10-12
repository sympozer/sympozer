<?php
namespace fibe\RestBundle\Form\DataTransformer;


use Symfony\Component\Form\DataTransformerInterface;
use Doctrine\Common\Persistence\ObjectManager;


class GetOrCreateEntityTransformer implements DataTransformerInterface
{
  /**
   * @var ObjectManager
   */
  private $om;
  private $uniqField;

  /**
   * @param ObjectManager $om
   */
  public function __construct(ObjectManager $om,$uniqField)
  {
    $this->om = $om;
    $this->uniqField = $uniqField;
  }

  public function transform($entities)
  {
      if (null === $entities) {
          return "";
      }

      return $entities->getId();
  }


  public function reverseTransform($entity)
  {
    if (!$entity) {
      return $entity;
    }


    $uniqFieldGetter = 'get' . ucwords($this->uniqField);
    $uniqFieldValue = $entity->$uniqFieldGetter();
    $result = $this->om
    ->getRepository(get_class($entity))
    ->findOneBy(array($this->uniqField => $uniqFieldValue))
    ;
     return $result;
//    if (null === $result)
//    {
//    $result = $entity;
//    }
//    else
//    {
//    $result = $this->om->merge($entity);
//    }
//    $results[] = $result;
//
//    return $results ;
  }
}