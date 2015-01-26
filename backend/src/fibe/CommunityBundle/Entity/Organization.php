<?php

namespace fibe\CommunityBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use fibe\ContentBundle\Util\StringTools;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints as DoctrineAssert;


/**
 *
 * @ORM\Table(name="organization")
 * @ORM\Entity(repositoryClass="fibe\CommunityBundle\Repository\OrganizationRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 * @DoctrineAssert\UniqueEntity(fields={"label"}, message = "{'field' : 'position', 'msg' : 'organizations.validations.unique'}")
 */
class Organization extends Agent
{

    /**
     * label
     * @ORM\Column(type="string", unique=true, nullable=false)
     * @Expose
     * @Groups({"list"})
     */
    protected $label;

    /**
     * Sponsors
     *
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Sponsor", mappedBy="organization", cascade={"all"})
     */
    protected $sponsors;
    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     */
    protected $slug;
    /**
     *
     * @ORM\OneToMany(targetEntity="Position",  mappedBy="organization",cascade={"persist","remove"})
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Expose
     */
    private $positions;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->sponsors = new ArrayCollection();
    }

    /**
     * Method to string for the entity
     *
     * @return mixed
     */
    public function __toString()
    {
        return $this->label;
    }

    /**
     * onUpdate
     *
     * @ORM\PostPersist()
     * @ORM\PreUpdate()
     */
    public function onUpdate()
    {
        $this->slugify();
    }

    /**
     * Slugify
     * @ORM\PrePersist()
     */
    public function slugify()
    {
        $this->setSlug(StringTools::slugify($this->getId() . $this->getLabel()));
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
     * @return $this
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Set label
     *
     * @param string $label
     *
     * @return $this
     */
    public function setLabel($label)
    {
        $this->label = $label;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getSponsors()
    {
        return $this->sponsors;
    }

    /**
     * @param mixed $sponsors
     */
    public function setSponsors($sponsors)
    {
        $this->sponsors = $sponsors;
    }

    /**
     * @return mixed
     */
    public function getPositions()
    {
        return $this->positions;
    }

    /**
     * @param mixed $positions
     */
    public function setPositions($positions)
    {
        $this->positions = $positions;
    }


}
