<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;

use Doctrine\ORM\EntityManagerInterface;
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

    /**
     * get or create an entity :
     * resolve the entity id from the input array
     * then get or create it whether the id has been found or not
     * @param array|string $input
     * @param string $entityClassName
     * @return object the asked entity
     */
    protected function getOrCreateEntity($input, $entityClassName)
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

        return $entity;
    }

    /**
     * get the entity class with namespace according to the form classname first arg
     * @param string $formType
     * @return string
     */
    protected function getEntityClassName($formType)
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