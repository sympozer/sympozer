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
     * transform model to view (entity to id)
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
        $output['id'] = $input->getId();
//        $output['label'] = $input->getLabel();
        return $output;
    }

    /**
     * transform view to model (array to entity)
     * @param array $input
     * @throws \Doctrine\ORM\EntityNotFoundException
     * @return object
     */
    public function reverseTransform($input)
    {
        if ($input == null)
        {
            return null;
        }

        $entityClassName = $this->getEntityClassName($this->options['type']);
        $output = $this->getOrCreateEntity($input, $entityClassName);

        if (null === $output)
        {
            throw new EntityNotFoundException($entityClassName);
        }

        if (is_array($input))
        {
            foreach ($input as $field => $value)
            {
                $setter = "set" . ucwords($field);
                $output->$setter($value);
            }
        }

        if (null == $id = $output->getId())
        {
            $this->em->persist($output);
        }
        else
        {
            $this->em->merge($output);
        }

        return $output;
    }
}