<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Location entity
 *
 * @ORM\Table(name="location")
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\LocationRepository")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorMap({
 *     "Location"="Location",
 *     "MainEventLocation"="MainEventLocation",
 *     "EventLocation"="EventLocation"
 * })
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
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Expose
     */
    protected $label;

    /**
     * Capacity to welcome atendees
     *
     * @ORM\Column(type="integer", nullable=true)
     * @Expose
     */
    protected $capacity;

    /**
     * Equipments who are in the location
     * @ORM\ManyToMany(targetEntity="fibe\ContentBundle\Entity\Equipment",  cascade={"all"})
     * @Expose
     */
    protected $equipments;

    /**
     * Description of the location
     *
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     */
    protected $description;

    /**
     * Accesibility of the location
     *
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     */
    protected $accesibility;

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
    protected $latitude;

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
    protected $longitude;


    /**
     * fix an issue with jms-serializer and form validation when applied to a doctrine InheritanceType("SINGLE_TABLE")
     */
    public $dtype;

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
}
