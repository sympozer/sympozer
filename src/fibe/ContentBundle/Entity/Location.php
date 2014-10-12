<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

use fibe\EventBundle\Entity\VEvent;
use fibe\EventBundle\Entity\MainEvent;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\VirtualProperty;

/**
 * Location entity
 *
 * @ORM\Table(name="location")
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\LocationRepository")
 * @ExclusionPolicy("all")
 */
class Location
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   * @Expose
   */
  private $id;

  /**
   * @ORM\Column(type="string", length=255)
   * @Expose
   */
  private $label;

  /**
   * Capacity to welcome atendees
   *
   * @ORM\Column(type="integer", nullable=true)
   * @Expose
   */
  private $capacity;

  /**
   * Equipments who are in the location
   * @ORM\ManyToMany(targetEntity="fibe\ContentBundle\Entity\Equipment",  cascade={"all"})
   * @Expose
   */
  private $equipments;

  /**
   * Description of the location
   *
   * @ORM\Column(type="text", nullable=true)
   * @Expose
   */
  private $description;

  /**
   * Accesibility of the location
   *
   * @ORM\Column(type="text", nullable=true)
   * @Expose
   */
  private $accesibility;

  /**
   * @ORM\Column(type="decimal", precision=10, scale=6, nullable=true)
   *
   * @Assert\Length(
   *      min = "-90",
   *      max = "90",
   *      minMessage = "You must be between -90 and 90.",
   *      maxMessage = "YYou must be between -90 and 90."
   * )
   * @Expose
   */
  private $latitude;

  /**
   * @ORM\Column(type="decimal", precision=10, scale=6, nullable=true)
   * @Assert\Length(
   *      min = "-180",
   *      max = "180",
   *      minMessage = "You must be between -180 and 180.",
   *      maxMessage = "YYou must be between -180 and 180."
   * )
   * @Expose
   */
  private $longitude;

  /**
   *
   * mainEvent
   *
   * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="locations", cascade={"persist"})
   * @ORM\JoinColumn(name="main_event_id", referencedColumnName="id")
   * @Expose
   * @SerializedName("mainEvent")
   */
  private $mainEvent;

  /**
   * Events
   *
   * @ORM\ManyToMany(targetEntity="fibe\EventBundle\Entity\VEvent", mappedBy="locations",cascade={"persist"})
   */
  private $events;


  /**
   * Constructor
   */
  public function __construct()
  {
    $this->equipments = new ArrayCollection();
    $this->events = new ArrayCollection();
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
   * getGeo
   *
   * @return string
   */
  public function getGeo()
  {
    return sprintf('%.6f;%.6f', $this->getLatitude(), $this->getLongitude());
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
   * Set name
   *
   * @param $label
   * @return Location
   */
  public function setLabel($label)
  {
    $this->label = $label;

    return $this;
  }

  /**
   * Get name
   *
   * @return string
   */
  public function getLabel()
  {
    return $this->label;
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
   * Get capacity
   *
   * @return integer
   */
  public function getCapacity()
  {
    return $this->capacity;
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
   * Get description
   *
   * @return string
   */
  public function getDescription()
  {
    return $this->description;
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
   * Get accesibility
   *
   * @return string
   */
  public function getAccesibility()
  {
    return $this->accesibility;
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
   * Get latitude
   *
   * @return float
   */
  public function getLatitude()
  {
    return $this->latitude;
  }

  /**
   * Set longitude
   *
   * @param float $longitude
   *
   * @return Location
   */
  public function setLongitude($longitude)
  {
    $this->longitude = $longitude;

    return $this;
  }

  /**
   * Get longitude
   *
   * @return float
   */
  public function getLongitude()
  {
    return $this->longitude;
  }

  /**
   * Add event
   *
   * @param VEvent $event
   *
   * @return Location
   */
  public function addEvent(VEvent $event)
  {
    $this->events[] = $event;

    return $this;
  }

  /**
   * Remove event
   *
   * @param VEvent $event
   */
  public function removeEvent(VEvent $event)
  {
    $this->events->removeElement($event);
  }

  /**
   * Get event
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getEvents()
  {
    return $this->events;
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
   * Set mainEvent
   *
   * @param MainEvent $mainEvent
   *
   * @return $this
   */
  public function setMainEvent(MainEvent $mainEvent)
  {
    $this->mainEvent = $mainEvent;

    return $this;
  }

  /**
   * Get mainEvent
   *
   * @return MainEvent
   */
  public function getMainEvent()
  {
    return $this->mainEvent;
  }
}
