<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;


class SympozerCollectionTypeTransformer extends AbstractSympozerTypeTransformer
{
    /**
     * transform model to view (array to ArrayCollection)
     * transform an array to a ArrayCollection object
     * @param array $input
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function transform($input)
    {
        $output = array();
        if (null === $input)
        {
            return null;
        }
        foreach ($input as $entity)
        {
            $output[] = $entity;
        }

        return new \Doctrine\Common\Collections\ArrayCollection($output);
    }

    /**
     * transform view to model (array to ArrayCollection)
     * transform an array to a ArrayCollection object
     * @param mixed $input
     * @return mixed
     */
    public function reverseTransform($input)
    {
//    echo "reverseTransform : COLLECTION";
//    \Doctrine\Common\Util\Debug::dump($input);
        if (!$input)
        {
            return null;
        }

        $output = array();
        foreach ($input as $detachedEntity)
        {
            $output[] = $detachedEntity;

        }

        return new \Doctrine\Common\Collections\ArrayCollection($output);
    }
}