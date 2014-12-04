<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;

use Doctrine\Common\Persistence\ObjectManager;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;
use Symfony\Component\Validator\Exception\InvalidArgumentException;


class SympozerCollectionTypeTransformer implements DataTransformerInterface
{

  /**
   * @var ObjectManager
   */
  private $om;
  /** @var  SerializerInterface */
  private $serializer;
  private $class;

  /**
   * @param ObjectManager $om
   */
  public function __construct(ObjectManager $om, SerializerInterface $serializer, $class)
  {
    $this->om = $om;
    $this->serializer = $serializer;
    $this->class = $class;
  }

  /**
   * TODO : transform this :
   *    collection of entity
   * into :
   *    array of key pair value with max depth.
   * @param mixed $input
   * @return \Doctrine\Common\Collections\ArrayCollection|mixed
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

//    foreach ($input as $entity)
//    {
//      $serializer = new Serializer(array(new GetSetMethodNormalizer()), array('json' => new JsonEncoder()));
//      $json = $serializer->serialize($entity, 'json');
////      $encoded = $this->serializer->serialize($entity, 'json');
//      $output[] =  json_decode($json,true);
//    }
//    return new \Doctrine\Common\Collections\ArrayCollection($output);
//    echo "transform : COLLECTION";
//    throw new \Exception(\Doctrine\Common\Util\Debug::dump(json_decode($encoded,true)));
//    return $output;
//
//    return array(array("id" => "id", "label" => "label"),array("id" => "id", "label" => "label"),array("id" => "id", "label" => "label"));
////    echo "transform : COLLECTION";
////    throw new \Exception(\Doctrine\Common\Util\Debug::dump($input));
//    foreach ($input as $key => $value)
//    {
//      $output[] = array('name' => $key, 'value' => $value);
//    }
////    foreach ($input as $entity)
////    {
////      $output[] = $entity->getId();
////    }
////    echo "transform : COLLECTION";
////    throw new \Exception(\Doctrine\Common\Util\Debug::dump($output));
////    return $input;
//    return new \Doctrine\Common\Collections\ArrayCollection($output);
  }

  /**
   * @throws TransformationFailedException if object (issue) is not found.
   */
  public function reverseTransform($input)
  {
//    echo "reverseTransform : COLLECTION";
//    throw new \Exception(print_r($input));
    if (!$input)
    {
      return null;
    }
//    echo "reverseTransform : COLLECTION";
//    throw new \Exception(print_r($input));

    $output = array();
    foreach ($input as $detachedEntity)
    {
      $entity = $this->getEntity($detachedEntity->getId());
//      $this->om->merge($detachedEntity);
      $output[] = $entity;
    }
//    echo "reverseTransform : COLLECTION";
//    throw new \Exception(print_r($output));

    return new \Doctrine\Common\Collections\ArrayCollection($output);
//    return $output;
  }

  protected function getEntity($id)
  {

    $output = $this->om
      ->getRepository($this->class)
      ->find($id);

    if (null === $output)
    {
      throw new InvalidArgumentException(sprintf(
        'The entity "%s" with id %s cannot be found!',
        $this->class,
        $id
      ));
    }
    return $output;
  }
}