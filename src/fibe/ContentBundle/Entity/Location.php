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
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
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
