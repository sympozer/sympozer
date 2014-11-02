<?php

namespace fibe\EventBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;

use fibe\CommunityBundle\Entity\Organization;
use fibe\CommunityBundle\Entity\Person;
use fibe\ContentBundle\Entity\Location;
use fibe\ContentBundle\Entity\Paper;
use fibe\ContentBundle\Entity\Role;
use fibe\ContentBundle\Entity\Sponsor;
use fibe\ContentBundle\Entity\Topic;
use fibe\ContentBundle\Util\StringTools;
use fibe\EventBundle\Entity\VEvent;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Main Event entity
 *
 * @ORM\Table(name="main_event")
 * @ORM\Entity(repositoryClass="fibe\EventBundle\Repository\MainEventRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("ALL")
 */
class MainEvent extends VEvent
{
    /**
     * Events
     *
     * @ORM\OneToMany(targetEntity="fibe\EventBundle\Entity\Event", mappedBy="mainEvent",cascade={"persist", "remove"})
     * @Expose
     */
    private $events;

    /**
     * Papers
     *
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Paper", mappedBy="mainEvent",cascade={"persist", "remove"})
     * @Expose
     */
    private $papers;

    /**
     * Roles
     *
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Role", mappedBy="mainEvent",cascade={"persist", "remove"})
     */
    private $roles;

    /**
     * Organizations
     *
     * @ORM\OneToMany(targetEntity="fibe\CommunityBundle\Entity\Organization", mappedBy="mainEvent",cascade={"persist", "remove"})
     */
    private $organizations;

    /**
     * Categories
     * @ORM\OneToMany(targetEntity="CategoryVersion", mappedBy="mainEvent",cascade={"persist", "remove"})
     */
    private $categoryVersions;


    /**
     *
     * @ORM\ManyToMany(targetEntity="fibe\CommunityBundle\Entity\Person",  mappedBy="mainEvents", cascade={"persist","merge","remove"})
     * @Expose
     */
    private $persons;

    /**
     * Team
     *
     * @ORM\OneToOne(targetEntity="fibe\SecurityBundle\Entity\Team",cascade={"persist", "remove"})
     * @Expose
     */
    private $team;

    /**
     * mappingFiles
     * @ORM\OneToOne(targetEntity="fibe\EventBundle\Entity\MainEventSettings", mappedBy="mainEvent", cascade={"all"})
     */
    private $setting;

    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     * @Expose
     */
    private $logo;


    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     */
    private $slug;

    /**
     *
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    private $acronym;

    /**
     * main event location
     *
     * @ORM\OneToOne(targetEntity="fibe\ContentBundle\Entity\MainEventLocation", cascade={"all"})
     * @ORM\JoinColumn(name="main_event_location_id", referencedColumnName="id")
     *  @Expose
     * @SerializedName("mainEventLocation")
     */
    private $mainEventLocation;

    /**
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\EventLocation", mappedBy="mainEvent",cascade={"persist", "remove"})
     * @Expose
     * @SerializedName("eventLocations")
     */
    private $eventLocations;

    /**
     * Slugify
     */
    public function slugify()
    {
        $this->setSlug(StringTools::slugify($this->getId() . $this->getLabel()));
    }

    /**
     * onUpdate
     *
     * @ORM\PostPersist()
     * @ORM\PreUpdate()
     */
    public function slugifyOnUpdate()
    {
        $this->slugify();
    }

    /**
     * Set slug
     *
     * @param string $slug
     *
     * @return $this
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Get slug
     *
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Sets file.
     *
     * @param String $logo
     *
     * @return $this
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;

        return $this;
    }

    /**
     * Get file.
     *
     * @return String
     */
    public function getLogo()
    {
        return $this->logo;
    }


    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->setIsAllDay(true);
        $this->events = new ArrayCollection();
        $this->roles = new ArrayCollection();
        $this->eventLocations = new ArrayCollection();
        $this->papers = new ArrayCollection();
        $this->persons = new ArrayCollection();
        $this->topics = new ArrayCollection();
        $this->sponsors = new ArrayCollection();
        $this->organizations = new ArrayCollection();
    }




    /**
     * Get papers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPapers()
    {
        return $this->papers;
    }

    /**
     * @param mixed $papers
     */
    public function setPapers($papers)
    {
        $this->papers = $papers;
    }


    /**
     * Get papers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * @param mixed $roles
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;
    }


    /**
     * Get persons
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPersons()
    {
        return $this->persons;
    }

    /**
     * @param mixed $persons
     */
    public function setPersons($persons)
    {
        $this->persons = $persons;
    }

    /**
     *
     * @param \fibe\SecurityBundle\Entity\Team $team
     *
     * @return $this
     */
    public function setTeam($team)
    {
        $this->team = $team;

        return $this;
    }

    /**
     *
     * @return \fibe\SecurityBundle\Entity\Team
     */
    public function getTeam()
    {
        return $this->team;
    }


    /**
     * Get sponsors
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSponsors()
    {
        return $this->sponsors;
    }


    /**
     * Get organizations
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOrganizations()
    {
        return $this->organizations;
    }

    /**
     * @param mixed $organizations
     */
    public function setOrganizations($organizations)
    {
        $this->organizations = $organizations;
    }

    /**
     * Add events
     *
     * @param VEvent $events
     *
     * @return $this
     */
    public function addEvent(VEvent $events)
    {
        $this->events[] = $events;

        return $this;
    }

    /**
     * @param mixed $events
     */
    public function setEvents($events)
    {
        $this->events = $events;
    }

    /**
     * Get events
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEvents()
    {
        return $this->events;
    }

    /**
     * @TODO comment
     *
     * @return bool
     */
    public function isEmpty()
    {
        return (count($this->events) <= 1)
        and (count($this->eventLocations) <= 1)
        and (count($this->papers) == 0)
        and (count($this->persons) == 0)
        and (count($this->organizations) == 0)
        and (count($this->topics) == 0);

    }

    /**
     * Set acronym
     *
     * @param string $acronym
     *
     * @return MainEvent
     */
    public function setAcronym($acronym)
    {
        $this->acronym = $acronym;

        return $this;
    }

    /**
     * Get acronym
     *
     * @return string
     */
    public function getAcronym()
    {
        return $this->acronym;
    }

    /**
     * @return mixed
     */
    public function getSetting()
    {
        return $this->setting;
    }

    /**
     * @param mixed $setting
     */
    public function setSetting($setting)
    {
        $this->setting = $setting;
    }

    /**
     * @return mixed
     */
    public function getCategoryVersions()
    {
        return $this->categoryVersions;
    }

    /**
     * @param mixed $categoryVersions
     */
    public function setCategoryVersions($categoryVersions)
    {
        $this->categoryVersions = $categoryVersions;
    }

    /**
     * @return mixed
     */
    public function getMainEventLocation()
    {
        return $this->mainEventLocation;
    }

    /**
     * @param mixed $mainEventLocation
     */
    public function setMainEventLocation($mainEventLocation)
    {
        $this->mainEventLocation = $mainEventLocation;
    }

    /**
     * @return mixed
     */
    public function getEventLocations()
    {
        return $this->eventLocations;
    }

    /**
     * @param mixed $eventLocations
     */
    public function setEventLocations($eventLocations)
    {
        $this->eventLocations = $eventLocations;
    }
}
