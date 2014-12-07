<?php
namespace fibe\CommunityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * The Position entity
 *
 * @ORM\Table(name="position")
 * @ORM\Entity(repositoryClass="fibe\CommunityBundle\Repository\PositionRepository")
 * @ORM\HasLifecycleCallbacks
 * @ExclusionPolicy("all")
 */
class Position
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Expose
     */
    private $id;

    /**
     * label
     * @ORM\Column(type="string", name="label", nullable=false)
     * @Expose
     */
    private $label;

    /**
     * Position
     * String expression representing person's position in the selected organization
     * @ORM\Column(type="string", name="position", nullable =false)
     * @Expose
     */
    private $position;

    /**
     * Person : the person who has this role
     *
     * @ORM\ManyToOne(targetEntity="fibe\CommunityBundle\Entity\Person", inversedBy="positions")
     * @Assert\NotBlank(message="You have to choose a Person")
     * @Expose
     */
    private $person;

    /**
     * @ORM\ManyToOne(targetEntity="fibe\CommunityBundle\Entity\Organization", inversedBy="positions")
     * @Assert\NotBlank(message="You have to choose an Organization")
     */
    private $organization;



    /**
     *
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function computeLabel()
    {
        $this->setLabel(sprintf("%s is %s at %s",
            $this->getPerson()->getLabel(),
            $this->getPosition(),
            $this->getOrganization()->getLabel()
        ));
    }


    /**
     * Get person
     *
     * @return Person
     */
    public function getPerson()
    {
        return $this->person;
    }

    /**
     * Set person
     *
     * @param Person $person
     *
     * @return Role
     */
    public function setPerson(Person $person = null)
    {
        $this->person = $person;

        return $this;
    }

  /**
   * @return mixed
   */
  public function getPosition()
  {
    return $this->position;
  }

  /**
   * @param mixed $position
   */
  public function setPosition($position)
  {
    $this->position = $position;
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
     * Get type
     *
     * @return String
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * Set type
     *
     * @param String $label
     *
     * @return String
     */
    public function setLabel($label)
    {
        $this->label = $label;

        return $this;
    }

    public function __toString()
    {
        return $this->label;
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
}