<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\File\UploadedFile;

use fibe\EventBundle\Entity\VEvent;
use fibe\ContentBundle\Entity\Location;

use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\SerializedName;
use JMS\Serializer\Annotation\VirtualProperty;


/**
 * This class define an Equipment for a location.
 *
 * @ORM\Table(name="equipment")
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\EquipmentRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Equipment
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   * @Expose
   * @Groups({"list"})
   */
  private $id;

  /**
   * label
   *
   * Equipment Label.
   *
   * @ORM\Column(type="string", length=255,name="label")
   * @Expose
   * @Groups({"list"})
   */
  private $label;

  /**
   * Description of the equipment
   *
   * @ORM\Column(type="text", nullable=true)
   * @Expose
   */
  private $description;

  /**
   * @var string $icon
   * @ORM\Column(name="icon", type="string", length=255, nullable=true)
   * @Expose
   * @Groups({"list"})
   */
  private $icon;

  public function __toString()
  {
    return $this->label;

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
   * @return Equipment
   */
  public function setId($id)
  {
    $this->id = $id;

    return $this;
  }

  /**
   * Set label
   *
   * @param string $label
   *
   * @return Equipment
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
   * Set description
   *
   * @param string $description
   *
   * @return Equipment
   */
  public function setDescription($description)
  {
    $this->description = $description;

    return $this;
  }

  /**
   * Get description
   *
   * @return string
   */
  public function getDescription()
  {
    return $this->description;
  }

  /**
   * Set icon
   *
   * @param string $icon
   *
   * @return Equipment
   */
  public function setIcon($icon)
  {
    $this->icon = $icon;

    return $this;
  }

  /**
   * Get icon
   *
   * @return string
   */
  public function getIcon()
  {
    return $this->icon;
  }
}
