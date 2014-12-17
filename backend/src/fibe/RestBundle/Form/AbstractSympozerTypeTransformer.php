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
     * get or create an entity. Doesn't persist.
     *
     * @param array|string $input
     * @param string $entityClassName
     * @return object the asked entity
     */
    protected function getOrCreateEntity($input, $entityClassName)
    {
        $entityId = $this->resolveIdFromInput($input);

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
     * Look for a direct string, then a getId method and finally, a array with 'id' key
     * @param mixed $input
     * @return string|null
     */
    public static function resolveIdFromInput($input)
    {
        $id = null;

        if (is_string($input))
        {
            $id = $input;
        }
        else if (is_object($input))
        {
            $id = $input->getId();
        }
        else if (is_array($input) && isset($input["id"]) && !empty($input["id"]))
        {
            $id = $input["id"];
        }

        return $id;
    }

    /**
     * get the entity class with namespace from a form classname
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