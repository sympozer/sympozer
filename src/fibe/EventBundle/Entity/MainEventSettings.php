<?php

namespace fibe\EventBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

use fibe\EventBundle\Entity\MainEvent;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;


/**
 * This entity define actives module for a conference
 *
 *
 * @ORM\Table(name="main_event_settings")
 * @ORM\Entity(repositoryClass="fibe\EventBundle\Repository\MainEventSettingsRepository")
 *
 */
class MainEventSettings
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   */
  private $id;

  /**
   * @ORM\Column(type="string", length=255)
   */
  private $label;

  /**
   * MainEvent
   *
   * @ORM\OneToOne(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="setting", cascade={"persist","merge","remove"})
   * @ORM\JoinColumn(name="mainEvent", referencedColumnName="id",onDelete="CASCADE")
   */
  private $mainEvent;

  /**
   *
   * @TODO THINK : à réfléchir... on veut généraliser... pas que des confs scientifique...
   *
   * @ORM\Column(type="boolean",options={"default" = 1})
   *
   */
  private $paperModule;

  /**
   * @TODO THINK : à réfléchir... on veut généraliser... pas que des confs scientifique...
   *
   * @ORM\Column(type="boolean",options={"default" = 1})
   *
   */
  private $organizationModule;

  /**
   * @TODO THINK : à réfléchir... on veut généraliser... pas que des confs scientifique...
   *
   * Module sponsors
   *
   * @ORM\Column(type="boolean",options={"default" = 1})
   */
  private $sponsorModule;

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
   * Set paperModule
   *
   * @param boolean $paperModule
   *
   * @return Module
   */
  public function setPaperModule($paperModule)
  {
    $this->paperModule = $paperModule;

    return $this;
  }

  /**
   * Get paperModule
   *
   * @return boolean
   */
  public function getPaperModule()
  {
    return $this->paperModule;
  }

  /**
   * Set organizationModule
   *
   * @param boolean $organizationModule
   *
   * @return Module
   */
  public function setOrganizationModule($organizationModule)
  {
    $this->organizationModule = $organizationModule;

    return $this;
  }

  /**
   * Get organizationModule
   *
   * @return boolean
   */
  public function getOrganizationModule()
  {
    return $this->organizationModule;
  }

  /**
   * Get sponsor module
   *
   * @return mixed
   */
  public function getSponsorModule()
  {
    return $this->sponsorModule;
  }

  /**
   * Set Sponsor module
   *
   * @param mixed $sponsorModule
   */
  public function setSponsorModule($sponsorModule)
  {
    $this->sponsorModule = $sponsorModule;
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
  public function getMainEvent()
  {
    return $this->mainEvent;
  }

  /**
   * @param mixed $mainEvent
   */
  public function setMainEvent($mainEvent)
  {
    $this->mainEvent = $mainEvent;
  }
}