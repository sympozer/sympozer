<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use fibe\EventBundle\Entity\Event;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;

/**
 * EventLocation
 *
 * @ORM\Table("event_location")
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\EventLocationRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class EventLocation extends Location
{

    /**
     *
     * mainEvent
     *
     * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="eventLocations", cascade={"persist"})
     * @ORM\JoinColumn(name="main_event_id", referencedColumnName="id")
     * @Expose
     * @SerializedName("mainEvent")
     */
    protected $mainEvent;

    /**
     * Events
     *
     * @ORM\ManyToMany(targetEntity="fibe\EventBundle\Entity\Event", mappedBy="eventLocations",cascade={"persist"})
     */
    protected $events;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->events = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getMainEvent()
    {
        return $this->mainEvent;
    }

    /**
     * @param mixed $mainEvent
     *  @return mixed
     */
    public function setMainEvent($mainEvent)
    {
        $this->mainEvent = $mainEvent;
    }

    /**
     * @return mixed
     */
    public function getEvents()
    {
        return $this->events;
    }

    /**
     * @param mixed $events
     */
    public function setEvents($events)
    {
        $this->events = $events;
    }

    /**
     * Add event
     *
     * @param Event $event
     *
     * @return Location
     */
    public function addEvent(Event $event)
    {
        $this->events[] = $event;

        return $this;
    }

    /**
     * Remove event
     *
     * @param Event $event
     */
    public function removeEvent(Event $event)
    {
        $this->events->removeElement($event);
    }


}

