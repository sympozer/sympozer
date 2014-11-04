<?php

namespace fibe\CommunityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use fibe\CommunityBundle\Entity\SocialService;
use Symfony\Component\Validator\Constraints as Assert;


use fibe\EventBundle\Entity\MainEvent;

/**
 * @TODO comment
 *
 * @ORM\Table(name="socialServiceAccount")
 * @ORM\Entity(repositoryClass="fibe\CommunityBundle\Repository\SocialServiceAccountRepository")
 *
 */
class SocialServiceAccount
{
  // Status values for "EVENT"
  const STATUS_FACEBOOK = "FACEBOOK"; // Indicates event was cancelled.
  const STATUS_TWITTER = "TWITTER"; // Indicates event is definite.
  const STATUS_LINKEDIN = "LINKEDIN"; // Indicates event is tentative.

  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  private $id;

  /**
   *   Name
   * @ORM\Column(type="string", name="name")
   */
  private $accountName;

  /**
   * @ORM\ManyToOne(targetEntity="Person", inversedBy="accounts")
   */
  private $owner;

//  /**
//   * @ORM\Column(type="string", length=32)
//   * @Assert\Choice(multiple=false, choices = {"Facebook","Twitter","LinkedIn"},  message = "Choose a valid social service.")
//   */
//  private $socialService;

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
   * Set accountName
   *
   * @param string $accountName
   *
   * @return SocialServiceAccount
   */
  public function setAccountName($accountName)
  {
    $this->accountName = $accountName;

    return $this;
  }

  /**
   * Get accountName
   *
   * @return string
   */
  public function getAccountName()
  {
    return $this->accountName;
  }

  /**
   * Set owner
   *
   * @param Person $owner
   *
   * @return SocialServiceAccount
   */
  public function setOwner(Person $owner = null)
  {
    $this->owner = $owner;

    return $this;
  }

  /**
   * Get owner
   *
   * @return Person
   */
  public function getOwner()
  {
    return $this->owner;
  }

//  /**
//   * Set socialService
//   *
//   * @param SocialService $socialService
//   *
//   * @return SocialServiceAccount
//   */
//  public function setSocialService(SocialService $socialService = null)
//  {
//    $this->socialService = $socialService;
//
//    return $this;
//  }
//
//  /**
//   * Get socialService
//   *
//   * @return SocialService
//   */
//  public function getSocialService()
//  {
//    return $this->socialService;
//  }
}