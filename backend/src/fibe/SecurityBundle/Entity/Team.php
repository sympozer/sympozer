<?php

namespace fibe\SecurityBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use fibe\EventBundle\Entity\MainEvent;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\MaxDepth;

/**
 * This entity define a team
 *
 * @ORM\Table(name="team")
 * @ORM\Entity()
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("ALL")
 */
class Team
{
  /**
   * @var integer
   *
   * @ORM\Column(name="id", type="integer")
   * @ORM\Id
   * @ORM\GeneratedValue(strategy="AUTO")
   * @Expose
   */
  private $id;

  /**
   * Conference
   *
   * @ORM\OneToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="team", cascade={"all"})
   */
  private $mainEvent;


  /**
   * teammate
   *
   * @ORM\OneToMany(targetEntity="fibe\SecurityBundle\Entity\Teammate", mappedBy="team", cascade={"all"})
   * @Expose
   * @MaxDepth(2)
   */
  private $teammates;

  public function __construct()
  {
    $this->teammates = new ArrayCollection();
  }

  /**
   * @return int
   */
  public function getId()
  {
    return $this->id;
  }

  /**
   * @return int
   */
  public function setId($id)
  {
    $this->id = $id;
  }

  /**
   * @return MainEvent
   */
  public function getMainEvent()
  {
    return $this->mainEvent;
  }

  public function setMainEvent(MainEvent $mainEvent = null)
  {
    $this->mainEvent = $mainEvent;

    return $this;
  }

  /**
   * Add a mainEvent manager
   *
   * @param User $teammate
   *
   * @return $this
   */
  public function addTeammate(User $teammate)
  {
    $this->teammates[] = $teammate;

    return $this;
  }

  /**
   * Remove a mainEvent manager
   *
   * @param User $teammate
   */
  public function removeTeammate(User $teammate)
  {
    $this->teammates->removeElement($teammate);
  }


  /**
   * Return all mainEvent managers
   *
   * @return ArrayCollection
   */
  public function getTeammates()
  {
    return $this->teammates;
  }

  /**
   * Return a representative string a the team
   */
  public function __toString()
  {
    return 'NO LABEL';
  }
}