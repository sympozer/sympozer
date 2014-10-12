<?php

namespace fibe\CommunityBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\ORM\Mapping as ORM;


use fibe\ContentBundle\Util\StringTools;
use fibe\EventBundle\Entity\MainEvent;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\VirtualProperty;
use Symfony\Component\Validator\Constraints as Assert;


/**
 *
 * @ORM\Table(name="organization_version")
 * @ORM\Entity(repositoryClass="fibe\CommunityBundle\Repository\OrganizationVersionRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class OrganizationVersion extends AdditionalInformations
{

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
     * Category
     * @ORM\ManyToOne(targetEntity="fibe\CommunityBundle\Entity\Organization", inversedBy="organizationPersonVersions", cascade={"persist"})
     * @ORM\JoinColumn(name="organization_id", referencedColumnName="id")
     * @Expose
     */
    private $organization;

    /**
     *
     * @ORM\ManyToOne(targetEntity="fibe\CommunityBundle\Entity\Person",  inversedBy="person",cascade={"persist","remove"})
     * @ORM\JoinColumn(onDelete="CASCADE")
     *
     */
    protected $organizationVersionOwner;

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
    public function getOrganizationVersionOwner()
    {
        return $this->organizationVersionOwner;
    }

    /**
     * @param mixed $organizationVersionOwner
     */
    public function setOrganizationVersionOwner($organizationVersionOwner)
    {
        $this->organizationVersionOwner = $organizationVersionOwner;
    }

    /**
     * @return mixed
     */
    public function getOrganization()
    {
        return $this->organization;
    }

    /**
     * @param mixed $organization
     */
    public function setOrganization($organization)
    {
        $this->organization = $organization;
    }


}
