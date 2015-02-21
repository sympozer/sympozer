<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;


use Doctrine\ORM\EntityNotFoundException;
use Symfony\Component\Form\Exception\TransformationFailedException;

class SympozerEntityTypeTransformer extends AbstractSympozerTypeTransformer
{

    /**
     * transform old model to view : entity to array (only the id in our rest case))
     * @param object $input
     * @return string
     */
    public function transform($input)
    {
        if (null == $input)
        {
            return null;
        }
        if ($id = $this->resolveIdFromInput($input))
        {
            return null;
        }
        $output = array();
        return $output;
    }

    /**
     * transform view to new model (array to entity).
     * Is responsible for any db operation on linked entities like persisting, make just a link or merge.
     *
     * @param array $input
     * @throws \Symfony\Component\Form\Exception\TransformationFailedException
     * @throws \Doctrine\ORM\EntityNotFoundException
     * @return object
     */
    public function reverseTransform($input)
    {
//        echo "\n\nentity reverseTransform";
        if ($input == null || (isset($input['id']) && $input['id'] == SympozerExtractIdFormListener::TO_IGNORE))
        {
            return null;
        }


        //resolve entity
        $entityClassName = $this->getEntityClassName($this->options['type']);
        $entity = $this->getOrCreateEntity($input, $entityClassName);
        if (null === $entity)
        {
            throw new EntityNotFoundException($entityClassName);
        }

        //if required and not cascaded the linked entity must have an id
        if (!$this->options['cascade_persist'] && $this->options['required'] && null == $entity->getId())
        {
            return null;
        }

        //cascades form on linked entity
        if ($this->options['cascade_persist'] && is_array($input))
        {
            //call entity setter from given input
            foreach ($input as $field => $value)
            {
                if (null != $value)
                {

                $setter = "set" . ucwords($field);
                $entity->$setter($value);

                }
            }
        }

        //create linked entity
        if (null == $entity->getId())
        {
            if (isset($input['id']) && count($input) == 1)
            {
                throw new TransformationFailedException("cannot transform %s with the given input %s");
            }
            $this->em->persist($entity);
        }
        //update linked entity
        else
        {
            $this->em->merge($entity);
        }

        return $entity;
    }
}