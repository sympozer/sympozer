<?php

namespace fibe\SecurityBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use fibe\EventBundle\Entity\MainEvent;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * This entity define a team
 *
 * @ORM\Table(name="team")
 * @ORM\Entity
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
   */
  private $id;


  /**
   * Conference
   *
   * @ORM\OneToOne(targetEntity="fibe\EventBundle\Entity\MainEvent",cascade={"persist","remove"})
   * @ORM\JoinColumn(name="conference", referencedColumnName="id",onDelete="CASCADE")
   */
  private $conference;


  /**
   * teammate
   *
   * @ORM\ManyToMany(targetEntity="fibe\SecurityBundle\Entity\User", mappedBy="teams",cascade={"persist"})
   * @Expose
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


  public function setMainEvent(MainEvent $conference = null)
  {
    $this->conference = $conference;

    return $this;
  }

  public function getMainEvent()
  {
    return $this->conference;
  }


  /**
   * Add a conference manager
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
   * Remove a conference manager
   *
   * @param User $teammate
   */
  public function removeTeammate(User $teammate)
  {
    $this->teammates->removeElement($teammate);
  }


  /**
   * Return all conference managers
   *
   * @return ArrayCollection
   */
  public function getTeammates()
  {
    return $this->teammates;
  }
}