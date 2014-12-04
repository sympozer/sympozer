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
    $entityId = isset($input["id"]) ? $input["id"] : $input;

    $output = $this->getEntity($this->options["class"], $entityId);

    return $output;
  }

  protected function getEntity($className, $id)
  {

    $output = $this->om
      ->getRepository($className)
      ->findOneBy(array('id' => $id));

    if (null === $output)
    {
      throw new InvalidArgumentException(sprintf(
        'The entity "%s" with id %s cannot be found!',
        $this->options["class"],
        $id
      ));
    }
    return $output;
  }
}