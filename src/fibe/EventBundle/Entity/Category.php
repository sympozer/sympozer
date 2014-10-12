<?php

namespace fibe\EventBundle\Entity;
use fibe\ContentBundle\Util\StringTools;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="category")
 * @ORM\Entity(repositoryClass="fibe\EventBundle\Repository\CategoryRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Category
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128,  unique=true)
     * @Expose
     */
    private $label;


    /**
     * @ORM\Column(type="string", length=128)
     */
    private $slug;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     */
    private $description;

    /**
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    private $color;


    /**
     * Category versions related to the global category
     *
     * @ORM\OneToMany(targetEntity="CategoryVersion", mappedBy="category",cascade={"persist"})
     * @ORM\JoinColumn( onDelete="CASCADE")
     * @Expose
     */
    private $categoryVersions;


    /**
     * Constructor
     */
    public function __construct()
    {
       // $this->$categoryVersions = new ArrayCollection();
    }

    /**
     * Slugify
     */
    public function slugify()
    {
        $this->setSlug(StringTools::slugify($this->getLabel()));
    }

    /**
     * onUpdate
     *
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function onUpdate()
    {
        $this->slugify();
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
     * @return mixed
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * @param mixed $label
     */
    public function setLabel($label)
    {
        $this->label = $label;
    }

    /**
     * @return mixed
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @param mixed $slug
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
    }



    /**
     * @return mixed
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * @param mixed $color
     */
    public function setColor($color)
    {
        $this->color = $color;
    }

    /**
     * @return mixed
     */
    public function getCategoryVersions()
    {
        return $this->categoryVersions;
    }

    /**
     * @param mixed $categoryVersions
     */
    public function setCategoryVersions($categoryVersions)
    {
        $this->categoryVersions = $categoryVersions;
    }

}

