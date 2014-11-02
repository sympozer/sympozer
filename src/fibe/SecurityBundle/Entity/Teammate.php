<?php

namespace fibe\SecurityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

use fibe\CommunityBundle\Entity\Person;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * @ORM\Entity(repositoryClass="fibe\SecurityBundle\Repository\TeammateRepository")
 * @ORM\Table
 * @ExclusionPolicy("ALL")
 */
class Teammate
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue()
   * @Expose
   */
  protected $id;

  /**
   * @ORM\ManyToOne(targetEntity="fibe\CommunityBundle\Entity\Person", inversedBy="teammates")
   * @ORM\JoinColumn(name="person_id", referencedColumnName="id", onDelete="Set Null")
   * @Expose
   */
  protected $person;

  /**
   * @ORM\ManyToOne(targetEntity="fibe\SecurityBundle\Entity\Team", inversedBy="teammates")
   * @ORM\JoinColumn(onDelete="Set Null")
   * @Expose
   */
  protected $team;

  /**
   * @var array ConfPermission
   * @Expose
   */
  protected $confPermissions;

  /**
   * if the user can edit the form ( need to have at least one master permission on a permission in the confPermission array)
   * @var boolean
   * @Expose
   */
  protected $restricted;

  /**
   * if the user can edit the form ( need to have at least one master permission on a permission in the confPermission array)
   * @var boolean
   * @Expose
   */
  protected $isOwner;


  public function __construct()
  {
    $this->confPermissions = new ArrayCollection();
  }

  public function setPerson(Person $user)
  {
    $this->person = $user;

    return $this;
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
   * @return Person
   */
  public function getPerson()
  {
    return $this->person;
  }

  /**
   * @return mixed
   */
  public function getTeam()
  {
    return $this->team;
  }

  /**
   * @param mixed $teams
   */
  public function setTeam($teams)
  {
    $this->team = $teams;
  }

  public function addConfPermission(ConfPermission $confPermission)
  {
    $this->confPermissions[] = $confPermission;
  }

  public function getConfPermissions()
  {
    return $this->confPermissions;
  }

  public function setConfPermissions(ArrayCollection $confPermissions)
  {
    $this->confPermissions = $confPermissions;

    return $this;
  }

  public function setRestricted($restricted)
  {
    $this->restricted = $restricted;

    return $this;
  }

  public function getRestricted()
  {
    return $this->restricted;
  }

  public function setIsOwner($isOwner)
  {
    $this->isOwner = $isOwner;

    return $this;
  }

  public function getIsOwner()
  {
    return $this->isOwner;
  }

}