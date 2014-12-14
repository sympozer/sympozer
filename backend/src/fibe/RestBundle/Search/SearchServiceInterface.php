<?php
/**
 *
 * @author benoitddlp
 */
namespace fibe\RestBundle\Search;

interface SearchServiceInterface
{
    /**
     *  Search with "LIKE %query%" for fields annotated with '@Doctrine\ORM\Column(type="string")'
     * @param string $entityClassName
     * @param string $query the query to search
     * @param int $limit max number of result
     * @param int $offset starting index
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function doSearch($entityClassName, $query, $limit, $offset);
}