<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * This entity define a role for a person in an event
 *
 *
 * @ORM\Table(name="role_type")
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\RoleLabelRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 *
 */
class RoleLabel
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     */
    protected $id;

    /**
     * label
     * @ORM\Column(type="string", name="label", nullable=false)
     * @Expose
     */
    protected $label;

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
     * __toString method
     *
     * @return mixed
     */
    public function __toString()
    {
        return $this->label;
    }

    /**
     * Set label
     *
     * @param string $label
     *
     * @return String
     */
    public function setLabel($label)
    {
        $this->label = $label;

        return $this;
    }

    /**
     * Get label
     *
     * @return string
     */
    public function getLabel()
    {
        return $this->label;
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


}