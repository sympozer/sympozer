<?php
/**
 *
 * @author benoitddlp
 */

namespace fibe\RestBundle\Form;


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
            return null;
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
//    echo "reverseTransform : COLLECTION";
//    throw new \Exception(\Doctrine\Common\Util\Debug::dump($input));
        if (!$input)
        {
            return null;
        }

        $output = array();
        foreach ($input as $detachedEntity)
        {
            if (!is_object($detachedEntity))
            {
            }
            $output[] = $detachedEntity;

            $entityId = $detachedEntity->getId();

        }

//    throw new \Exception(\Doctrine\Common\Util\Debug::dump($output));
        return new \Doctrine\Common\Collections\ArrayCollection($output);
    }
}