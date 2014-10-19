<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * This entity define a version of a role for a specific conference
 *
 *
 * @ORM\Table(name="role_label_version", uniqueConstraints={@UniqueConstraint(name="search_idx", columns={"label", "mainevent_id"})})
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\RoleLabelVersionRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 *
 */
class RoleLabelVersion
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
     * RoleLabel
     * @ORM\ManyToOne(targetEntity="fibe\ContentBundle\Entity\RoleLabel", inversedBy="roleLabelVersions", cascade={"persist"})
     * @ORM\JoinColumn(name="roleLabel_id", referencedColumnName="id")
     * @Expose
     * @SerializedName("roleLabel")
     */
    private $roleLabel;

    /**
     * role
     * Role who have this type
     * @ORM\OneToMany(targetEntity="Role", mappedBy="roleLabelVersion")
     *  @Expose
     * @MaxDepth(1)
     */
    private $roles;


    /**
     * Main Event
     *
     * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="roleLabelVersions", cascade={"persist"})
     * @ORM\JoinColumn(name="mainevent_id", referencedColumnName="id", nullable=false)
     * @Expose
     * @MaxDepth(1)
     * @SerializedName("mainEvent")
     */
    private $mainEvent;


    /**
     * Constructor
     */
    public function __construct()
    {
        $this->role = new ArrayCollection();
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
    public function getRoleLabel()
    {
        return $this->roleLabel;
    }

    /**
     * @param mixed $roleLabel
     */
    public function setRoleLabel($roleLabel)
    {
        $this->roleLabel = $roleLabel;
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
     * @param mixed $mainEvent
     */
    public function setMainEvent($mainEvent)
    {
        $this->mainEvent = $mainEvent;
    }

    /**
     * @return mixed
     */
    public function getMainEvent()
    {
        return $this->mainEvent;
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
}