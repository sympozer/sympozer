<?php

namespace fibe\EventBundle\Services;

use fibe\EventBundle\Entity\CategoryVersion;
use fibe\RestBundle\Services\AbstractBusinessService;

/**
 * Class CategoryVersionService
 * @package fibe\EventBundle\Services
 */
class CategoryVersionService extends AbstractBusinessService
{

    public function post(CategoryVersion $category = null,  $categoryClassName)
    {
        $this->createGlobalEntity($this->entityManager, $category, $categoryClassName, "setCategory");
    }

}
