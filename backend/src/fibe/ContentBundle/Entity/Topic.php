<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Mapping as ORM;
use fibe\ContentBundle\Entity\Paper;
use fibe\EventBundle\Entity\MainEvent;
use fibe\EventBundle\Entity\VEvent;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use Symfony\Component\Validator\Constraints as Assert;

use fibe\ContentBundle\Util\StringTools;


/**
 * This entity define a topic
 *
 * @ORM\Table(name="topic", options={"collate"="utf8_bin"})
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\TopicRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Topic
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue()
   * @Expose
   */
  private $id;

  /**
   * label
   *
   * @ORM\Column(type="string", unique=true)
   * @Expose
   */
  private $label;

  /**
   * Papers related to this topic
   *
   * @ORM\ManyToMany(targetEntity="Paper", mappedBy="topics" , cascade={"persist","merge","remove"})
   */
  private $papers;

  /**
   * Events related to this topic
   *
   * @ORM\ManyToMany(targetEntity="fibe\EventBundle\Entity\VEvent", mappedBy="topics", cascade={"persist","merge","remove"})
   */
  private $vEvents;

  /**
   * @ORM\Column(type="string", length=128, nullable=true)
   */
  private $slug;

  /**
   * Constructor
   */
  public function __construct()
  {
    $this->papers = new ArrayCollection();
    $this->vEvents = new ArrayCollection();
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
   * Slugify
   *
   */
  public function slugify()
  {
    $this->setSlug(StringTools::slugify($this->getLabel(), false));
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
    return $this->slug;
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
   * Set id
   *
   * @param string $id
   *
   * @return $this
   */
  public function setId($id)
  {
    $this->id = $id;

    return $this;
  }

  /**
   * Add papers
   *
   * @param Paper $papers
   *
   * @return Topic
   */
  public function addPaper(Paper $papers)
  {
    $this->papers[] = $papers;

    return $this;
  }

  /**
   * Remove papers
   *
   * @param Paper $papers
   */
  public function removePaper(Paper $papers)
  {
    $this->papers->removeElement($papers);
  }

  /**
   * Get papers
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getPapers()
  {
    return $this->papers;
  }

  /**
   * Add events
   *
   * @param VEvent $events
   *
   * @return Topic
   */
  public function addVEvent(VEvent $events)
  {
    $this->vEvents[] = $events;

    return $this;
  }

  /**
   * Remove events
   *
   * @param VEvent $events
   */
  public function removeVEvent(VEvent $events)
  {
    $this->vEvents->removeElement($events);
  }

  /**
   * Get events
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getVEvents()
  {
    return $this->vEvents;
  }

  /**
   * Set label
   *
   * @param string $label
   *
   * @return Topic
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
}
