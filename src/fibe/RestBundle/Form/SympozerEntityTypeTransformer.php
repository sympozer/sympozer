<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;


class SympozerEntityTypeTransformer extends AbstractSympozerTypeTransformer
{

  /**
   * transform model to view (entity to id)
   * @param object $input
   * @return string
   */
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
   * transform view to model (array to entity)
   * @param array $input
   * @return object
   */
  public function reverseTransform($input)
  {
    if (!$input)
    {
      return null;
    }
    $formType = $this->options['type'];

    $entityClassName = $this->getEntityClassName($formType);
    $entity = $this->getOrCreateEntity($input, $entityClassName);

    if (null == $id = $entity->getId())
    {
      $this->em->persist($entity);
    }
    else
    {
      $this->em->merge($entity);
    }

//    echo "reverseTransform : entity";
//    throw new \Exception(\Doctrine\Common\Util\Debug::dump($entity));

    return $entity;
  }
}