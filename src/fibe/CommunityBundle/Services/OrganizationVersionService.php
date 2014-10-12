<?php

namespace fibe\CommunityBundle\Services;

use fibe\CommunityBundle\Entity\OrganizationVersion;
use fibe\RestBundle\Services\AbstractBusinessService;


class OrganizationVersionService extends AbstractBusinessService
{

    public function post(OrganizationVersion $organizationPersonVersion = null,  $organizationPersonVersionClassName)
    {
        $this->createGlobalEntity($this->entityManager, $organizationPersonVersion, $organizationPersonVersionClassName, "setOrganization");
    }

}
