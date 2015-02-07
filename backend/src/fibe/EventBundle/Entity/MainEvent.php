<?php

namespace fibe\EventBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\ORM\Mapping as ORM;
use fibe\CommunityBundle\Entity\Person;
use fibe\ContentBundle\Entity\Paper;
use fibe\ContentBundle\Entity\Role;
use fibe\ContentBundle\Util\StringTools;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Main Event entity
 *
 * @ORM\Table(name="main_event", indexes={
 *    @ORM\Index(name="start_at_idx", columns={"start_at"})
 * })
 * @ORM\Entity(repositoryClass="fibe\EventBundle\Repository\MainEventRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("ALL")
 * @UniqueEntity("label", message="Label_already_used")
 */
class MainEvent extends VEvent
{

    /**
     *  Person that created this mainEvent
     * @ORM\ManyToOne(targetEntity="fibe\CommunityBundle\Entity\Person",  inversedBy="ownMainEvents")
     */
    protected $owner;
    /**
     * label -> summary
     *
     * This property defines a short summary or subject for the
     * calendar component.
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Expose
     * @Groups({"list"})
     */
    protected $label;
    /**
     * Events
     *
     * @ORM\OneToMany(targetEntity="fibe\EventBundle\Entity\Event", mappedBy="mainEvent",cascade={"persist", "remove"})
     * @MaxDepth(2)
     * @Expose
     */
    protected $events;
    /**
     * Papers
     *
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Paper", mappedBy="mainEvent",cascade={"persist", "remove"})
     * @MaxDepth(2)
     * @Expose
     */
    protected $papers;
    /**
     * Roles
     *
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Role", mappedBy="mainEvent",cascade={"persist", "remove"})
     * @MaxDepth(2)
     * @Expose
     */
    protected $roles;
    /**
     * dtstart
     *
     * This property specifies when the calendar component begins.
     *
     * @ORM\Column(type="datetime", name="start_at")
     * @Assert\NotBlank(message = "{'field' : 'startAts', 'msg' : 'mainEvents.validations.start_date_required'}")
     * @SerializedName("startAt")
     * @Expose
     * @Groups({"list"})
     */
    protected $startAt;
    /**
     * dtend
     *
     * This property specifies the date and time that a calendar
     * component ends.
     *
     * @ORM\Column(type="datetime", name="end_at")
     * @Assert\NotBlank(message = "{'field' : 'endAts', 'msg' : 'mainEvents.validations.end_date_required'}")
     * @SerializedName("endAt")
     * @Expose
     * @Groups({"list"})
     */
    /**
     * Team
     *
     * @ORM\OneToOne(targetEntity="fibe\SecurityBundle\Entity\Team", mappedBy="mainEvent", cascade={"all"})
     * @Expose
     */
    protected $team;
    /**
     * mappingFiles
     * @ORM\OneToOne(targetEntity="fibe\EventBundle\Entity\MainEventSettings", mappedBy="mainEvent", cascade={"all"})
     */
    protected $setting;
    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     * @Expose
     * @Groups({"list"})
     */
    protected $logo;
    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     */
    protected $slug;
    /**
     *
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    protected $acronym;
    /**
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Location", mappedBy="mainEvent",cascade={"persist", "remove"})
     * @MaxDepth(2)
     * @Expose
     * @SerializedName("eventLocations")
     */
    protected $eventLocations;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->events = new ArrayCollection();
        $this->roles = new ArrayCollection();
        $this->eventLocations = new ArrayCollection();


        $this->papers = new ArrayCollection();

        $this->topics = new ArrayCollection();
        $this->sponsors = new ArrayCollection();
        $this->organizations = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getStartAt()
    {
        return $this->startAt;
    }

    /**
     * @param mixed $startAt
     */
    public function setStartAt($startAt)
    {
        $this->startAt = $startAt;
    }

    /**
     * onUpdate
     *
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function onUpdate()
    {
        $this->slugify();
    }

    /**
     * Slugify
     */
    public function slugify()
    {
        $this->setSlug(StringTools::slugify($this->getLabel() . "." . $this->getId()));
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
     * Get file.
     *
     * @return String
     */
    public function getLogo()
    {
        return $this->logo;
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
     * Get papers
     *
     * @return Collection
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
     * Get roles
     *
     * @return Collection
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * @param Collection $roles
     */
    public function setRoles(Collection $roles)
    {
        $this->roles = $roles;
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
     * Get sponsors
     *
     * @return Collection
     */
    public function getSponsors()
    {
        return $this->sponsors;
    }

    /**
     * Get organizations
     *
     * @return Collection
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
     * Get events
     *
     * @return Collection
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
     * @TODO comment
     *
     * @return bool
     */
    public function isEmpty()
    {
        return (count($this->events) <= 1)
        and (count($this->eventLocations) <= 1)
        and (count($this->papers) == 0)
        and (count($this->organizations) == 0)
        and (count($this->topics) == 0);

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

    /**
     * @return Person
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * @param Person $owner
     */
    public function setOwner(Person $owner)
    {
        $this->owner = $owner;
    }


    /**
     * auto persist of embedded data
     * @TODO find a better solution to persist linked object
     * @ORM\PreFlush
     */
    public function updateSomething(PreFlushEventArgs $eventArgs)
    {
        if (!$this->getId() || !$this->getLocation())
        {
            return;
        }
        $em = $eventArgs->getEntityManager();
        $uow = $em->getUnitOfWork();

        if ($this->getLocation()->getLabel() != null)
        {
            // $uow->computeChangeSets();
            $uow->persist($this->getLocation());
//            $uow->recomputeSingleEntityChangeSet(
//                $em->getClassMetadata(get_class($this->getLocation())),
//                $this->getLocation()
//            );
        }

    }


    /**
     * Validates start is before end
     *  don't perform the check if one date is missing
     * @Assert\True(message = "{'field' : 'endAts', 'msg' : 'mainEvents.validations.end_date_after_start'}")
     *
     * @return bool
     */
    public function isDatesValid()
    {
        if ($this->startAt && $this->endAt)
        {
            return $this->startAt <= $this->endAt;
        }

        return true;
    }

    /**
     * @return mixed
     */
    public function getEndAt()
    {
        return $this->endAt;
    }

    /**
     * @param mixed $endAt
     */
    public function setEndAt($endAt)
    {
        $this->endAt = $endAt;
    }


}

