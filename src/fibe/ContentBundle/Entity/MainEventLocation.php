<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;

/**
 * MainEventLocation
 * @ORM\Table("main_event_location")
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\MainEventLocationRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class MainEventLocation extends Location
{
    /**
     * main event location @ORM\OneToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", cascade={"all"})
     */
    protected $mainEvent;

    /**
     * @return mixed
     */
    public function getMainEvent()
    {
        return $this->mainEvent;
    }

    /**
     * @param mixed $mainEvent
     */
    public function setMainEvent($mainEvent)
    {
        $this->mainEvent = $mainEvent;
    }

}

