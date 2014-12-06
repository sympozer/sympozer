<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Proxy\Exception\InvalidArgumentException;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;


class SympozerEntityTypeTransformer implements DataTransformerInterface
{

  /**
   * @var ObjectManager
   */
  private $om;
  private $options;

  /**
   * @param ObjectManager $om
   * @param array $options
   */
  public function __construct(ObjectManager $om, array $options)
  {
    $this->om = $om;
    $this->options = $options;
  }

  public function transform($input)
  {
//    echo "transform : entity";
//    throw new \Exception(\Doctrine\Common\Util\Debug::dump($input));
    if (null != $input)
    {
      $input = $input->getId();
    }
    return $input;
  }

  /**
   * @throws TransformationFailedException if object is not found.
   */
  public function reverseTransform($input)
  {

    if (!$input)
    {
      return null;
    }

    $entityId = isset($input["id"]) ? $input["id"] : (is_string($input) ? $input : null);

    /** @var \Symfony\Component\Form\FormTypeInterface $form */
    $form = $this->options['type'];
    $entityClassName = $this->getEntityClassName($form);

    if (!$entityId)
    {
      $entity = new $entityClassName();
      foreach ($input as $field => $value)
      {
        $setter = "set" . ucwords($field);
        $entity->$setter($value);
      }
    }
    else
    {
      $entity = $this->om
        ->getRepository($entityClassName)
        ->findOneBy(array('id' => $entityId));

      if (null === $entity)
      {
        throw new InvalidArgumentException(sprintf(
          'The entity "%s" with id %s cannot be found!',
          $entityClassName,
          $entityId
        ));
      }
    }
    return $entity;
  }

  public function getEntityClassName()
  {
    //transform fibe\ContentBundle\Form\LocationType
    //       to fibe\ContentBundle\Entity\LocationType
    $className = preg_replace('/\\\\Form\\\\/', '\\Entity\\', get_class($this->options['type']), 1);

    //transform fibe\ContentBundle\Entity\LocationType
    //       to fibe\ContentBundle\Entity\Location
    $className = preg_replace('/\\\\Form\\\\/', '\\Entity\\', get_class($this->options['type']), 1);
    $className = substr($className, 0, count($className) - 5);
    return $className;

  }
}