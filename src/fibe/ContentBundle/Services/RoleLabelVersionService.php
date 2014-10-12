<?php

namespace fibe\ContentBundle\Services;

use fibe\ContentBundle\Entity\RoleLabelVersion;
use fibe\RestBundle\Services\AbstractBusinessService;

/**
 * Class RoleVersionService
 * @package fibe\ContentBundle\Services
 */
class RoleLabelVersionService extends AbstractBusinessService
{

    public function post(RoleLabelVersion $roleLabelVersion = null,  $roleLabelVersionClassName)
    {
        $this->createGlobalEntity($this->entityManager, $roleLabelVersion, $roleLabelVersionClassName, "setRoleLabel");
    }

}
