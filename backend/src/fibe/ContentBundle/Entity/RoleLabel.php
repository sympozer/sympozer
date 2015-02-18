<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * This entity define a role for a person in an event
 *
 *
 * @ORM\Table(name="role_label")
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
     * @Groups({"list"})
     */
    protected $id;

    /**
     * label
     * @ORM\Column(type="string", name="label", nullable=false)
     * @Expose
     * @Groups({"list"})
     */
    protected $label;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     */
    private $description;

    /**
     * Categories
     * @ORM\OneToMany(targetEntity="Role", mappedBy="roleLabel")
     */
    private $roles;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->roles = new ArrayCollection();
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
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
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
     * Get label
     *
     * @return string
     */
    public function getLabel()
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
     * Add role
     *
     * @param Role $role
     *
     * @return Role
     */
    public function addRole(Role $role)
    {
        $this->roles[] = $role;

        return $this;
    }

    /**
     * Remove roles
     *
     * @param Role $role
     */
    public function removeRole(Role $role)
    {
        $this->roles->removeElement($role);
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