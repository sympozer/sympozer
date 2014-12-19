<?php

namespace fibe\ContentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

use fibe\ContentBundle\Util\StringTools;


/**
 * This entity define a sponsor
 *
 * @ORM\Table(name="sponsor")
 * @ORM\Entity(repositoryClass="fibe\ContentBundle\Repository\SponsorRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Sponsor
{
  /**
   * @ORM\Id
   * @ORM\Column(type="integer")
   * @ORM\GeneratedValue(strategy="AUTO")
   * @Groups({"list"})
   */
  protected $id;

  /**
   * Name of the sponsor
   *
   * @ORM\Column(type="string")
   */
  protected $label;

  /**
   * The name of the logo file
   *
   * @var UploadedFile
   * @Assert\File(maxSize="2M",
   * mimeTypes = {"image/jpeg", "image/png", "image/gif", "image/jpg"},
   * mimeTypesMessage = "The file must be an image")
   */
  private $logo;

  /**
   * The path of the logo file
   *
   * @var String
   * @ORM\Column(name="logoPath", type="string", length=255,nullable=true)
   */
  private $logoPath;

  /**
   * @ORM\Column(type="string", length=128, nullable=true)
   */
  protected $slug;

  /**
   * Organization who is the sponsor
   *
   * @ORM\ManyToOne(targetEntity="fibe\CommunityBundle\Entity\Organization", inversedBy="sponsors")
   * @ORM\JoinColumn(name="organization_id", referencedColumnName="id", onDelete="Set Null")
   */
  protected $organization;

  /**
   * Events related to a sponsor
   *
   * @ORM\ManyToOne(targetEntity="fibe\EventBundle\Entity\VEvent", inversedBy="sponsors", cascade={"persist"})
   * @ORM\JoinColumn(name="v_event_id", referencedColumnName="id", onDelete="Set Null")
   */
  protected $vEvent;

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
   * Set Label
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

  /**
   * @return UploadedFile
   */
  public function getLogo()
  {
    return $this->logo;
  }

  /**
   * @param UploadedFile $logo
   */
  public function setLogo(UploadedFile $logo = null)
  {
    $this->logo = $logo;
  }

  /**
   * @return String
   */
  public function getLogoPath()
  {
    return $this->logoPath;
  }

  /**
   * @param String $logoPath
   */
  public function setLogoPath($logoPath)
  {
    $this->logoPath = $logoPath;
  }

  /**
   * Return the directory where the logo will be store
   *
   * @return string
   */
  protected function getUploadRootDir()
  {
    // the absolute directory path where uploaded
    // documents should be saved
    return __DIR__ . '/../../../../../web/' . $this->getUploadDir();
  }

  /**
   * The name of the directory where the logo will be store
   *
   * @return string
   */
  protected function getUploadDir()
  {
    // get rid of the __DIR__ so it doesn't screw up
    // when displaying uploaded doc/image in the view.
    return 'uploads/sponsors/';
  }

  /**
   * Upload the logo to the server
   */
  public function uploadLogo()
  {
    // the file property can be empty if the field is not required
    if (null === $this->getLogo())
    {
      return;
    }

    // générer un nom aléatoire et essayer de deviner l'extension (plus sécurisé)
    $extension = $this->getLogo()->guessExtension();
    if (!$extension)
    {
      // l'extension n'a pas été trouvée
      $extension = 'bin';
    }
    $name = $this->getId() . '.' . $extension;
    $this->getLogo()->move($this->getUploadRootDir(), $name);
    $this->setLogoPath($name);
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

  /**
   * @return mixed
   */
  public function getVEvent()
  {
    return $this->vEvent;
  }

  /**
   * @param mixed $vEvent
   */
  public function setVEvent($vEvent)
  {
    $this->vEvent = $vEvent;
  }
}
