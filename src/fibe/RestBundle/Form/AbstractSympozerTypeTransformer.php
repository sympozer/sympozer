<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Symfony\Component\Form\DataTransformerInterface;


abstract class AbstractSympozerTypeTransformer implements DataTransformerInterface
{

  /**
   * @var EntityManagerInterface
   */
  protected $em;
  protected $options;

  /**
   * @param EntityManagerInterface $em
   * @param array $options
   */
  public function __construct(EntityManagerInterface $em, array $options)
  {
    $this->em = $em;
    $this->options = $options;
  }

  function getOrCreateEntity($input, $entityClassName)
  {
    //extract entity id from the form input
    $entityId = isset($input["id"]) ? $input["id"] : (is_string($input) ? $input : null);

    if (!$entityId)
    {
      $entity = new $entityClassName();
    }
    else
    {
      $entity = $this->em
        ->getRepository($entityClassName)
        ->findOneBy(array('id' => $entityId));
    }

    if (null === $entity)
    {
      throw new EntityNotFoundException($entityClassName);
    }

    if (is_array($input))
    {
      foreach ($input as $field => $value)
      {
        $setter = "set" . ucwords($field);
        $entity->$setter($value);
      }
    }
//    else
//    {
//      $entity->setId($input);
//
//    }
    return $entity;
  }

  public function getEntityClassName($formType)
  {
    //transform fibe\ContentBundle\Form\LocationType
    //       to fibe\ContentBundle\Entity\LocationType
    $className = preg_replace('/\\\\Form\\\\/', '\\Entity\\', get_class($formType), 1);

    //transform fibe\ContentBundle\Entity\LocationType
    //       to fibe\ContentBundle\Entity\Location
    $className = substr($className, 0, count($className) - 5);
    return $className;

  }
}