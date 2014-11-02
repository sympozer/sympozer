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
 * @ORM\Entity(repositoryClass="fibe\SecurityBundle\Repository\TeamRepository")
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
   * @ORM\OneToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", cascade={"all"})
   * @ORM\JoinColumn(name="mainEvent", referencedColumnName="id",onDelete="CASCADE")
   */
  private $mainEvent;


  /**
   * teammate
   *
   * @ORM\ManyToMany(targetEntity="fibe\CommunityBundle\Entity\Person", mappedBy="teams", cascade={"persist"})
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


  public function setMainEvent(MainEvent $mainEvent = null)
  {
    $this->mainEvent = $mainEvent;

    return $this;
  }

  public function getMainEvent()
  {
    return $this->mainEvent;
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