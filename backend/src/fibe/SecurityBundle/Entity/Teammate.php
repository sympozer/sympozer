<?php

namespace fibe\SecurityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use fibe\CommunityBundle\Entity\Person;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="fibe\SecurityBundle\Repository\TeammateRepository")
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="teammate")
 * @ExclusionPolicy("ALL")
 */
class Teammate
{

    /**
     * @ORM\Column(type="string")
     */
    protected $label;

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
     * @Assert\NotBlank(message = "{'field' : 'persons', 'msg' : 'teammates.validations.person_required'}")
     * @Expose
     */
    protected $person;

    /**
     * @ORM\ManyToOne(targetEntity="Team", inversedBy="teammates")
     * @ORM\JoinColumn(onDelete="Set Null")
     * @Assert\NotBlank(message = "{'field' : 'teams', 'msg' : 'teammates.validations.team_required'}")
     * @Expose
     */
    protected $team;

    public function __construct()
    {
    }

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function labelize()
    {
        $this->setLabel(
            sprintf("%s (%s)", $this->getPerson()->getLabel(), $this->getPerson()->getEmail())
        );
    }

    /**
     * @return Person
     */
    public function getPerson()
    {
        return $this->person;
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
     * @param string $id
     */
    public function setId($id)
    {
        $this->id = $id;
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
     * @return Team
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
}