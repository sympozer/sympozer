<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;


use Symfony\Component\Form\Exception\TransformationFailedException;

class SympozerCollectionTypeTransformer extends AbstractSympozerTypeTransformer
{
  /**
   * transform model to view (array of objects to ArrayCollection of objects)
   * transform an array to a ArrayCollection object
   * @param array $input
   * @return \Doctrine\Common\Collections\ArrayCollection
   */
  public function transform($input)
  {
//    echo "transform : COLLECTION";
//    throw new \Exception(\Doctrine\Common\Util\Debug::dump($input));
    $output = array();
    if (null === $input)
    {
      return $output;
    }
    foreach ($input as $entity)
    {
      $output[] = $entity;
//      $output[] =  array("id"=>$entity->getId());
    }
    return new \Doctrine\Common\Collections\ArrayCollection($output);
  }

  /**
   * transform view to model (array to )
   * transform an array to a ArrayCollection object
   * @param mixed $input
   * @return mixed
   */
  public function reverseTransform($input)
  {
    if (!$input)
    {
      return null;
    }

    $output = array();
    foreach ($input as $detachedEntity)
    {
      if (!is_object($detachedEntity))
      {
        \Doctrine\Common\Util\Debug::dump($input);
        throw new TransformationFailedException("NULL ENTITY");
      }
      $output[] = $detachedEntity;

      $entityId = $detachedEntity->getId();

      // throw new \Exception(\Doctrine\Common\Util\Debug::dump($input));
      // TODO fix this ?
      // TODO fix this ?
      // TODO fix this ?
//      if (!$entityId)
//      {
//        $this->em->persist($detachedEntity);
//      }
//      else
//      {
//        $this->em->merge($detachedEntity);
//      }
    }
    return new \Doctrine\Common\Collections\ArrayCollection($output);
  }
}