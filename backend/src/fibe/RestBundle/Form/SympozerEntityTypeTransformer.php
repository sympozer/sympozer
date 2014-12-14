<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;


use Doctrine\ORM\EntityNotFoundException;

class SympozerEntityTypeTransformer extends AbstractSympozerTypeTransformer
{

    /**
     * transform old model to view (entity to id)
     * @param object $input
     * @return string
     */
    public function transform($input)
    {
        if (null == $input)
        {
//      throw new \Exception("entity transform NULL " . \Doctrine\Common\Util\Debug::dump($input));
            return null;
        }
        $output = array();
        $output['id'] = $this->resolveIdFromInput($input);

//        $output['label'] = $input->getLabel();
        return $output;
    }

    /**
     * transform view to new model (array to entity)
     * @param array $input
     * @throws \Doctrine\ORM\EntityNotFoundException
     * @return object
     */
    public function reverseTransform($input)
    {
        if ($input == null || count($input) == 0)
        {
            return null;
        }

        $entityClassName = $this->getEntityClassName($this->options['type']);
        $entity = $this->getOrCreateEntity($input, $entityClassName);

        if (null === $entity)
        {
            throw new EntityNotFoundException($entityClassName);
        }

        if ($this->options['cascade_persist'] && is_array($input))
        {
            foreach ($input as $field => $value)
            {
                $setter = "set" . ucwords($field);
                $entity->$setter($value);
            }
        }
        if (null == $entity->getId())
        {
//            echo "\n\nentity reverseTransform => persist";
//            \Doctrine\Common\Util\Debug::dump($entity);
            $this->em->persist($entity);
        }
        else
        {
//            echo "\n\nentity reverseTransform => merge";
//            \Doctrine\Common\Util\Debug::dump($entity);
            $this->em->merge($entity);
        }

        return $entity;
    }
}