<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * localization entity
 * A localization is a geographic point with geocoding information
 * @ORM\Table(name="localization")
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\LocalizationRepository")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorMap({
 *     "Location"="Location",
 *     "Localization"="Localization",
 * })
 * @ExclusionPolicy("all")
 */
class Localization
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
     * address
     * The fully formatted address line containing street number, street, city, state, country
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $address;

    /**
     * street
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $street;


    /**
     * street number
     *
     * @ORM\Column(type="integer", nullable=true)
     * @Expose
     */
    protected $streetNumber;


    /**
     * city
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $city;

    /**
     * state
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $state;




    /**
     * country
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $country;


    /**
     * country code
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $countryCode;


    /**
     * postalCode code
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $postalCode;



    /**
     * @ORM\OneToOne(targetEntity="fibe\CommunityBundle\Entity\Person", cascade={"all"})
     * @ORM\JoinColumn(name="uid", referencedColumnName="id", onDelete="cascade")
     */
    protected $person;


    /**
     * fix an issue with jms-serializer and form validation when applied to a doctrine InheritanceType("SINGLE_TABLE")
     */
    public $dtype;


    /**
     * Constructor
     */
    public function __construct()
    {
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
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param mixed $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * @return mixed
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param mixed $country
     */
    public function setCountry($country)
    {
        $this->country = $country;
    }

    /**
     * @return mixed
     */
    public function getCountryCode()
    {
        return $this->countryCode;
    }

    /**
     * @param mixed $countryCode
     */
    public function setCountryCode($countryCode)
    {
        $this->countryCode = $countryCode;
    }

    /**
     * @return mixed
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * @param mixed $street
     */
    public function setStreet($street)
    {
        $this->street = $street;
    }

    /**
     * @return mixed
     */
    public function getStreetNumber()
    {
        return $this->streetNumber;
    }

    /**
     * @param mixed $streetNumber
     */
    public function setStreetNumber($streetNumber)
    {
        $this->streetNumber = $streetNumber;
    }


    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return mixed
     */
    public function getPerson()
    {
        return $this->person;
    }

    /**
     * @param mixed $person
     */
    public function setPerson($person)
    {
        $this->person = $person;
    }

    /**
     * @return mixed
     */
    public function getPostalCode()
    {
        return $this->postalCode;
    }

    /**
     * @param mixed $postalCode
     */
    public function setPostalCode($postalCode)
    {
        $this->postalCode = $postalCode;
    }

    /**
     * @return mixed
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @param mixed $state
     */
    public function setState($state)
    {
        $this->state = $state;
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
}
