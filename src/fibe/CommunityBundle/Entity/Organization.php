<?php

namespace fibe\CommunityBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\ORM\Mapping as ORM;


use fibe\ContentBundle\Util\StringTools;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

use Symfony\Component\Validator\Constraints as Assert;


/**
 *
 * @ORM\Table(name="organization")
 * @ORM\Entity(repositoryClass="fibe\CommunityBundle\Repository\OrganizationRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Organization extends AdditionalInformations
{

    /**
     * Sponsors
     *
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Sponsor", mappedBy="organization", cascade={"all"})
     */
    protected $sponsors;

    /**
     *
     * @ORM\OneToMany(targetEntity="OrganizationVersion",  mappedBy="organization",cascade={"persist","remove"})
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Expose
     */
    private $organizationVersions;

    /**
     * @ORM\Column(type="string", length=256, nullable=true)
     */
    protected $slug;

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
     * Slugify
     * @ORM\PrePersist()
     */
    public function slugify()
    {
        $this->setSlug(StringTools::slugify($this->getId() . $this->getLabel()));
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
    public function getOrganizationVersions()
    {
        return $this->organizationVersions;
    }

    /**
     * @param mixed $organizationVersions
     */
    public function setOrganizationVersions($organizationVersions)
    {
        $this->organizationVersions = $organizationVersions;
    }

}
