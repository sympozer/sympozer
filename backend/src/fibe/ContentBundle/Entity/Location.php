<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use fibe\ImportBundle\Annotation\Importer;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Location entity
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\LocationRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Location extends Localization
{
    /**
     * fix an issue with jms-serializer and form validation when applied to a doctrine InheritanceType("SINGLE_TABLE")
     */
    public $dtype;
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     * @Groups({"list"})
     */
    protected $id;
    /**
     * importCode used to easily make link between entities during data import
     * @ORM\Column(type="string", nullable=true)
     * @Importer
     */
    protected $importCode;
    /**
     * Capacity to welcome attendees
     *
     * @ORM\Column(type="integer", nullable=true)
     * @Expose
     * @Groups({"list"})
     *
     * @Importer()
     */
    protected $capacity;
    /**
     * Equipments who are in the location
     * @ORM\ManyToMany(targetEntity="fibe\ContentBundle\Entity\Equipment",  cascade={"all"})
     * @Expose
     * @Groups({"list"})
     *
     * @Importer(uniqField="label", collection=true, create=true, targetEntity="fibe\ContentBundle\Entity\Equipment")
     */
    protected $equipments;
    /**
     * Description of the location
     *
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     * @Groups({"list"})
     *
     * @Importer()
     */
    protected $description;
    /**
     * Accesibility of the location
     *
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     * @Groups({"list"})
     *
     * @Importer()
     */
    protected $accesibility;
    /**
     *
     * mainEvent
     *
     * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="eventLocations")
     * @ORM\JoinColumn(referencedColumnName="id")
     * @Expose
     * @Groups({"list"})
     * @MaxDepth(1)
     * @SerializedName("mainEvent")
     */
    protected $mainEvent;

    /**
     * Events
     *
     * @ORM\OneToMany(targetEntity="fibe\EventBundle\Entity\Vevent", mappedBy="location")
     */
    protected $events;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->equipments = new ArrayCollection();
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
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get capacity
     *
     * @return integer
     */
    public function getCapacity()
    {
        return $this->capacity;
    }

    /** Set capacity
     *
     * @param string $capacity
     *
     * @return Location
     */
    public function setCapacity($capacity)
    {
        $this->capacity = $capacity;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Location
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get accesibility
     *
     * @return string
     */
    public function getAccesibility()
    {
        return $this->accesibility;
    }

    /**
     * Set accesibility
     *
     * @param string $accesibility
     *
     * @return Location
     */
    public function setAccesibility($accesibility)
    {
        $this->accesibility = $accesibility;

        return $this;
    }

    /**
     * Set latitude
     *
     * @param float $latitude
     *
     * @return Location
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;

        return $this;
    }


    /**
     * Add Equipment
     *
     * @param $equipments
     *
     * @return $this
     */
    public function addEquipment($equipments)
    {
        $this->equipments[] = $equipments;

        return $this;
    }

    /**
     * Remove Equipment
     *
     * @param Equipment $equipments
     */
    public function removeEquipment(Equipment $equipments)
    {
        $this->equipments->removeElement($equipments);
    }

    /**
     * Get Equipments
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getEquipments()
    {
        return $this->equipments;
    }

    /**
     * @param mixed $equipments
     */
    public function setEquipments($equipments)
    {
        $this->equipments = $equipments;
    }

    /**
     * @return mixed
     */
    public function getDtype()
    {
        return $this->dtype;
    }

    /**
     * @param mixed $dtype
     */
    public function setDtype($dtype)
    {
        $this->dtype = $dtype;
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
     * Add equipments
     *
     * @param Equipment $equipments
     *
     * @return $this
     */
    public function addEvent(Equipment $equipments)
    {
        $this->equipments[] = $equipments;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getImportCode()
    {
        return $this->importCode;
    }

    /**
     * @param mixed $importCode
     */
    public function setImportCode($importCode)
    {
        $this->importCode = $importCode;
    }

}
