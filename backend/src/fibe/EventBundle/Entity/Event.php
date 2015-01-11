<?php

namespace fibe\EventBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use fibe\ContentBundle\Entity\Paper;
use fibe\ContentBundle\Util\StringTools;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\SerializedName;


/**
 * Class Event
 *
 * @package fibe\EventBundle\Entity
 *
 * @ORM\Table(name="event", indexes={
 *    @ORM\Index(name="start_at_idx", columns={"start_at"})
 * })
 * @ORM\Entity(repositoryClass="fibe\EventBundle\Repository\EventRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Event extends VEvent
{
    /**
     * Category
     *
     * @ORM\ManyToOne(targetEntity="Category", inversedBy="events")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     * @Groups({"list"})
     */
    protected $category;
    /**
     * label -> summary
     *
     * This property defines a short summary or subject for the
     * calendar component.
     * @ORM\Column(type="string", length=255, unique=false, nullable=false)
     * @Expose
     * @Groups({"list"})
     */
    protected $label;
    /**
     * The parent of the event
     *
     * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\Event", inversedBy="children", cascade={"persist","detach"})
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id", onDelete="SET NULL", nullable=true)
     */
    protected $parent;
    /**
     * The events who are children
     *
     * @ORM\OneToMany(targetEntity="fibe\EventBundle\Entity\Event", mappedBy="parent", cascade={"persist"})
     */
    protected $children;
    /**
     * dtstart
     *
     * This property specifies when the calendar component begins.
     *
     * @ORM\Column(type="datetime", name="start_at")
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
     * @SerializedName("endAt")
     * @Expose
     * @Groups({"list"})
     */
    protected $endAt;


    /**
     * Main Event
     *
     * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="events", cascade={"persist"})
     * @ORM\JoinColumn(name="mainevent_id", referencedColumnName="id")
     * @Expose
     * @SerializedName("mainEvent")
     * @Groups({"list"})
     */
    protected $mainEvent;
    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     */
    protected $slug;
    /**
     * Papers presented at an event
     *
     * @ORM\ManyToMany(targetEntity="fibe\ContentBundle\Entity\Paper", inversedBy="events", cascade={"persist"})
     * @ORM\JoinTable(name="event_paper",
     *     joinColumns={@ORM\JoinColumn(name="event_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="paper_id", referencedColumnName="id")})
     * @MaxDepth(1)
     */
    protected $papers;

    /**
     * Is an all day event
     * Used for ui representation in the calendar view
     *
     * @ORM\Column(name="all_day", type="boolean")
     * @Expose
     * @SerializedName("allDay")
     * @Groups({"list"})
     */
    protected $allDay;


    /**
     * Roles for the event
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Role", mappedBy="event", cascade={"persist"})
     * @Expose
     * @Groups({"list"})
     * @MaxDepth(3)
     */
    protected $roles;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->papers = new ArrayCollection();
        $this->children = new ArrayCollection();
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
        //$this->setIsInstant($this->getEndAt()->format('U') == $this->getStartAt()->format('U'));

        //ensure main conf has correct properties
//    if ($this->isMainVEvent) //@TODO EVENT
//    {
//      $this->fitChildrenDate(true);
//      if ($this->getEndAt()->getTimestamp() <= $this->getStartAt()->getTimestamp())
//      {
//        $endAt = clone $this->getStartAt();
//        $this->setEndAt($endAt->add(new \DateInterval('P1D')));
//      }
//      $this->setIsInstant(false);
//    }
    }

    /**
     * Slugify
     */
    protected function slugify()
    {
        echo $this->getLabel();
//        throw new \Exception("slug event");
        $this->setSlug(StringTools::slugify(hash('sha256', uniqid(mt_rand(), true), true) . $this->getLabel()));
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
     * Has children
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function hasChildren()
    {
        return count($this->children) != 0;
    }

    /**
     * Get slug
     *
     * @return string
     */
    public function getSlug()
    {
        $this->slugify();

        return $this->slug;
    }

    /**
     * Set slug
     *
     * @param string $slug
     *
     * @return Event
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return Event
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Get conference
     *
     * @return MainEvent
     */
    public function getMainEvent()
    {
        return $this->mainEvent;
    }

    /**
     * Set conference
     *
     * @param MainEvent $mainEvent
     *
     * @internal param \fibe\EventBundle\Entity\MainEvent $conference
     *
     * @return Event
     */
    public function setMainEvent(MainEvent $mainEvent)
    {
        $this->mainEvent = $mainEvent;

        return $this;
    }

    /**
     * Add papers
     *
     * @param Paper $papers
     *
     * @return Event
     */
    public function addPaper(Paper $papers)
    {
        $this->papers[] = $papers;

        return $this;
    }

    /**
     * Remove papers
     *
     * @param Paper $papers
     */
    public function removePaper(Paper $papers)
    {
        $this->papers->removeElement($papers);
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
     * Get parent
     *
     * @return Event
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Set parent
     *
     * @param VEvent $parent
     *
     * @return Event
     */
    public function setParent(VEvent $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Add children
     *
     * @param Event $children
     *
     * @return $this
     */
    public function addChildren(Event $children)
    {
        $this->children[] = $children;

        return $this;
    }

    /**
     * Remove children
     *
     * @param VEvent $children
     */
    public function removeChildren(VEvent $children)
    {
        $this->children->removeElement($children);
    }

    /**
     * Get children
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * @param mixed $children
     */
    public function setChildren($children)
    {
        $this->children = $children;
    }

    /**
     * @return mixed
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
     * @return mixed
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param mixed $category
     */
    public function setCategory($category)
    {
        $this->category = $category;
    }

    /**
     * Get allDay
     *
     * @return string
     */
    public function getallDay()
    {
        return $this->allDay;
    }

    /**
     * Set allDay
     *
     * @param string $allDay
     *
     * @return VEvent
     */
    public function setallDay($allDay)
    {
        $this->allDay = $allDay;

        return $this;
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


}
