<?php

namespace fibe\EventBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use fibe\ContentBundle\Util\StringTools;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\VirtualProperty;

/**
 * @ORM\Table(name="category_version")
 * @ORM\Entity(repositoryClass="fibe\EventBundle\Repository\CategoryVersionRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class CategoryVersion
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128)
     */
    private $slug;

    /**
     * @ORM\Column(type="string", length=128)
     * @Expose
     */
    private $label;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    private $color;

    /**
     * Events related to an category
     *
     * @ORM\OneToMany(targetEntity="Event", mappedBy="category",cascade={"persist"})
     * @ORM\JoinColumn( onDelete="CASCADE")
     * @Expose
     */
    private $events;

    /**
     * Main Event
     *
     * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="categoryVersions", cascade={"persist"})
     * @ORM\JoinColumn(name="mainevent_id", referencedColumnName="id")
     * @Expose
     * @MaxDepth(1)
     * @SerializedName("mainEvent")
     */
    private $mainEvent;

    /**
     * Category
     * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\Category", inversedBy="categoryVersions", cascade={"persist"})
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     * @Expose
     */
    private $category;



    /**
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     */
    private $description;


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->events = new ArrayCollection();
    }


    /**
     * Slugify
     */
    public function slugify()
    {
        $this->setSlug(StringTools::slugify($this->getLabel()));
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
     * toString
     *
     * @return string
     */
    public function __toString()
    {
        return $this->getLabel();
    }


    /**
     * @return mixed
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * @param mixed $color
     */
    public function setColor($color)
    {
        $this->color = $color;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
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
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
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

    /**
     * @return mixed
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @param mixed $slug
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
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


}
