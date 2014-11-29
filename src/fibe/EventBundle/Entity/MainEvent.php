<?php

namespace fibe\EventBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\ORM\Mapping as ORM;
use fibe\CommunityBundle\Entity\Person;
use fibe\ContentBundle\Entity\Paper;
use fibe\ContentBundle\Entity\Role;
use fibe\ContentBundle\Util\StringTools;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Main Event entity
 *
 * @ORM\Table(name="main_event")
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
   * @ORM\Column(type="string", length=255, unique=true, nullable=false)
   * @Expose
   */
  private $label;
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
   * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\RoleLabelVersion", mappedBy="mainEvent",cascade={"persist", "remove"})
   */
  private $roleLabelVersions;
  /**
   * Categories
   * @ORM\OneToMany(targetEntity="fibe\EventBundle\Entity\CategoryVersion", mappedBy="mainEvent",cascade={"persist", "remove"})
   * @Expose
   * @SerializedName("categoryVersions")
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
   * @ORM\OneToOne(targetEntity="fibe\SecurityBundle\Entity\Team", mappedBy="mainEvent", cascade={"all"})
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
   * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Location", mappedBy="mainEvent",cascade={"persist", "remove"})
   * @Expose
   * @SerializedName("eventLocations")
   */
  private $eventLocations;

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
    $this->categoryVersions = new ArrayCollection();

    $this->papers = new ArrayCollection();
    $this->persons = new ArrayCollection();
    $this->topics = new ArrayCollection();
    $this->sponsors = new ArrayCollection();
    $this->organizations = new ArrayCollection();
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
   * Slugify
   */
  public function slugify()
  {
    $this->setSlug(StringTools::slugify($this->getId() . $this->getLabel()));
  }

  /**
   * @return mixed
   */
  public function getLabel()
  {
    return $this->label;
  }

  /**
   * @param mixed $label
   */
  public function setLabel($label)
  {
    $this->label = $label;
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
   * Get events
   *
   * @return \Doctrine\Common\Collections\Collection
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
    and (count($this->persons) == 0)
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
   * @return mixed
   */
  public function getRoleLabelVersions()
  {
    return $this->roleLabelVersions;
  }

  /**
   * @param mixed $roleLabelVersions
   */
  public function setRoleLabelVersions($roleLabelVersions)
  {
    $this->roleLabelVersions = $roleLabelVersions;
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

        if($this->getLocation()->getLabel() != null){
           // $uow->computeChangeSets();
            $uow->persist($this->getLocation());
//            $uow->recomputeSingleEntityChangeSet(
//                $em->getClassMetadata(get_class($this->getLocation())),
//                $this->getLocation()
//            );
        }

    }

}
