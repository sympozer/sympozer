<?php

namespace fibe\CommunityBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use fibe\ContentBundle\Entity\Paper;
use fibe\ContentBundle\Entity\Role;
use fibe\ContentBundle\Util\StringTools;
use fibe\SecurityBundle\Entity\Teammate;
use fibe\SecurityBundle\Entity\User;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * This entity is based on the specification FOAF.
 *
 * This class define a Person.
 * @ORM\Table(name="person")
 * @ORM\HasLifecycleCallbacks
 * @ORM\Entity(repositoryClass="fibe\CommunityBundle\Repository\PersonRepository")
 * @ExclusionPolicy("ALL")
 *
 */
class Person extends AdditionalInformations
{

  /**
   * @ORM\Column(type="string")
   * @Expose
   */
  protected $label;

  /**
   * technical user
   *
   * @ORM\OneToOne(targetEntity="fibe\SecurityBundle\Entity\User", cascade={"all"})
   * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="cascade")
   *
   */
  protected $user;

  /**
   * @ORM\OneToMany(targetEntity="fibe\SecurityBundle\Entity\Teammate", mappedBy="person")
   * @Expose
   */
  protected $teammates;

  /**
   * @ORM\Column(type="string", nullable=true,  name="familyName")
   * @Expose
   * @SerializedName("familyName")
   */
  protected $familyName;

  /**
   * @Assert\NotBlank(message="Please give a first name")
   * @ORM\Column(type="string", nullable=true,  name="firstName")
   * @Expose
   * @SerializedName("firstName")
   */
  protected $firstName;

  /**
   * @ORM\Column(type="string", length=1024, nullable=true, name="description")
   * @Expose
   */
  protected $description;

  /**
   * @ORM\Column(type="integer", nullable=true,  name="age")
   * @Expose
   */
  protected $age;

  /**
   * Paper made by this person
   * @Expose
   * @ORM\ManyToMany(targetEntity="fibe\ContentBundle\Entity\Paper",  mappedBy="authors", cascade={"all"})
   */
  protected $papers;

  /**
   * @ORM\Column(type="string", nullable=true,  name="openId")
   */
  protected $openId;

  /**
   *
   * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Role",  mappedBy="person",cascade={"persist","remove"})
   * @ORM\JoinColumn(onDelete="CASCADE")
   * @Expose
   */
  protected $roles;

  /**
   * @ORM\ManyToMany(targetEntity="fibe\EventBundle\Entity\MainEvent", inversedBy="persons", cascade={"persist"})
   * @ORM\JoinTable(name="main_event_person",
   *     joinColumns={@ORM\JoinColumn(name="mainevent_id", referencedColumnName="id")},
   *     inverseJoinColumns={@ORM\JoinColumn(name="person_id", referencedColumnName="id")})
   */
  protected $mainEvents;

  /**
   * @ORM\OneToMany(targetEntity="SocialServiceAccount",  mappedBy="owner", cascade={"persist", "remove"})
   */
  protected $accounts;
  /**
   * @ORM\Column(type="string", length=256, nullable=true)
   */
  protected $slug;
  /**
   *  Person that invited this person
   * @ORM\ManyToOne(targetEntity="Person",  inversedBy="guests", cascade={"all"})
   * @ORM\JoinColumn(onDelete="CASCADE")
   */
  protected $invitedBy;
  /**
   * @ORM\OneToMany(targetEntity="fibe\CommunityBundle\Entity\OrganizationVersion", mappedBy="organizationVersionOwner", cascade={"all"}, orphanRemoval=true)
   * @Expose
   */
  private $organizations;
  /**
   *  Persons invited by this person
   * @ORM\OneToMany(targetEntity="Person", mappedBy="invitedBy", cascade={"all"}, orphanRemoval=true)
   */
  private $guests;

  /**
   * Constructor
   */
  public function __construct()
  {
    $this->teammates = new ArrayCollection();
    $this->papers = new ArrayCollection();
    $this->organizations = new ArrayCollection();
    $this->roles = new ArrayCollection();
    $this->accounts = new ArrayCollection();
    $this->mainEvents = new ArrayCollection();
    $this->guests = new ArrayCollection();
  }

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
   * onCreation
   *
   * @ORM\PrePersist()
   * @ORM\PreUpdate()
   */
  public function computeLabel()
  {
    $this->setLabel($this->firstName . " " . $this->familyName);
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
   * Slugify
   * @ORM\PrePersist()
   */
  public function slugify()
  {
    $this->setSlug(StringTools::slugify($this->getId() . $this->getLabel()));
  }

  /**
   * Get label
   *
   * @return string
   */
  public function getlabel()
  {
    return $this->label;
  }

  /**
   * Set label
   *
   * @param string $label
   *
   * @return $this
   */
  public function setLabel($label)
  {
    $this->label = $label;

    return $this;
  }

  /**
   * Get slug
   *
   * @return string
   */
  public function getSlug()
  {
    $this->slugify();

    return $this->slug;
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
   * Get familyName
   *
   * @return string
   */
  public function getFamilyName()
  {
    return $this->familyName;
  }

  /**
   * Set familyName
   *
   * @param string $familyName
   *
   * @return $this
   */
  public function setFamilyName($familyName)
  {
    $this->familyName = $familyName;

    return $this;
  }

  /**
   * Get firstName
   *
   * @return string
   */
  public function getFirstName()
  {
    return $this->firstName;
  }

  /**
   * Set firstName
   *
   * @param string $firstName
   *
   * @return $this
   */
  public function setFirstName($firstName)
  {
    $this->firstName = $firstName;

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
   * Set description
   *
   * @param string $description
   *
   * @return $this
   */
  public function setDescription($description)
  {
    $this->description = $description;

    return $this;
  }

  /**
   * Get age
   *
   * @return integer
   */
  public function getAge()
  {
    return $this->age;
  }

  /**
   * Set age
   *
   * @param integer $age
   *
   * @return $this
   */
  public function setAge($age)
  {
    $this->age = $age;

    return $this;
  }

  /**
   * Get openId
   *
   * @return string
   */
  public function getOpenId()
  {
    return $this->openId;
  }

  /**
   * Set openId
   *
   * @param string $openId
   *
   * @return $this
   */
  public function setOpenId($openId)
  {
    $this->openId = $openId;

    return $this;
  }

  /**
   * Add teammate
   *
   * @param Teammate $teammate
   *
   * @return User
   */
  public function addTeammate(Teammate $teammate)
  {
    $this->teammates[] = $teammate;

    return $this;
  }

  /**
   * Remove teammates
   *
   * @param Teammate $teammate
   */
  public function removeTeammate(Teammate $teammate)
  {
    $this->teammates->removeElement($teammate);
  }

  /**
   * Get teammates
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getTeammates()
  {
    return $this->teammates;
  }


  /**
   * Add papers
   *
   * @param Paper $papers
   *
   * @return $this
   */
  public function addPaper(Paper $papers)
  {
    $this->papers[] = $papers;
    $papers->addAuthor($this);
    return $this;
  }

  /**
   * Remove papers
   *
   * @param Paper $papers
   */
  public function removePaper(Paper $papers)
  {
    $this->papers->removeElement($papers);
  }

  /**
   * Get papers
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getPapers()
  {
    return $this->papers;
  }

  /**
   * @param mixed $papers
   */
  public function setPapers($papers)
  {
    $this->papers = $papers;
  }

  /**
   * Remove organization
   *
   * @param OrganizationVersion $organization
   */
  public function removeOrganization(OrganizationVersion $organization)
  {
//    echo $organization->getLabel();die;
    $organization->setOrganizationVersionOwner(null);
    $this->organizations->removeElement($organization);
  }

  /**
   * Get organization
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getOrganizations()
  {
    return $this->organizations;
  }

  /**
   * Set organizations
   *
   * @param ArrayCollection $organizations
   * @return $this
   */
  public function setOrganizations(ArrayCollection $organizations)
  {
    $this->organizations->clear();
    foreach ($organizations as $organization)
    {
      $this->addOrganization($organization);
    }

    return $this;
  }

  /**
   * Add organization
   *
   * @param OrganizationVersion $organization
   *
   * @return $this
   */
  public function addOrganization(OrganizationVersion $organization)
  {
    $this->organizations[] = $organization;
    $organization->setOrganizationVersionOwner($this);
    return $this;
  }

  /**
   * Add roles
   *
   * @param Role $roles
   *
   * @return $this
   */
  public function addRole(Role $roles)
  {
    $this->roles[] = $roles;

    return $this;
  }

  /**
   * Remove roles
   *
   * @param Role $roles
   */
  public function removeRole(Role $roles)
  {
    $this->roles->removeElement($roles);
  }

  /**
   * Get roles
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getRoles()
  {
    return $this->roles;
  }

  /**
   * @param mixed $roles
   */
  public function setRoles($roles)
  {
    $this->roles = $roles;
  }

  /**
   * Set mainEvents
   *
   * @param ArrayCollection $mainEvents
   * @return $this
   */
  public function setMainEvent(ArrayCollection $mainEvents)
  {
    $this->mainEvents = $mainEvents;

    return $this;
  }

  /**
   * Get mainEvents
   *
   * @return ArrayCollection
   */
  public function getMainEvents()
  {
    return $this->mainEvents;
  }

  /**
   * @param mixed $mainEvents
   */
  public function setMainEvents($mainEvents)
  {
    $this->mainEvents = $mainEvents;
  }

  /**
   * Add accounts
   *
   * @param SocialServiceAccount $accounts
   *
   * @return $this
   */
  public function addAccount(SocialServiceAccount $accounts)
  {
    $this->accounts[] = $accounts;

    return $this;
  }

  /**
   * Remove accounts
   *
   * @param SocialServiceAccount $accounts
   */
  public function removeAccount(SocialServiceAccount $accounts)
  {
    $this->accounts->removeElement($accounts);
  }

  /**
   * Get accounts
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getAccounts()
  {
    return $this->accounts;
  }

  /**
   * @param mixed $accounts
   */
  public function setAccounts($accounts)
  {
    $this->accounts = $accounts;
  }

  /**
   * @return \fibe\SecurityBundle\Entity\User
   */
  public function getUser()
  {
    return $this->user;
  }

  /**
   * @param \fibe\SecurityBundle\Entity\User $user
   */
  public function setUser(User $user = null)
  {
    if ($user != null)
    {
      $user->setPerson($this);
    }
    $this->user = $user;
  }

  /**
   * @return Person
   */
  public function getInvitedBy()
  {
    return $this->invitedBy;
  }

  /**
   * @param Person $invitedBy
   */
  public function setInvitedBy(Person $invitedBy)
  {
    $this->invitedBy = $invitedBy;
  }

  /**
   * Add guests
   *
   * @param Person $guests
   *
   * @return $this
   */
  public function addGuest(Person $guests)
  {
    $this->guests[] = $guests;

    return $this;
  }

  /**
   * Remove guests
   *
   * @param Person $guests
   */
  public function removeGuest(Person $guests)
  {
    $this->guests->removeElement($guests);
  }

  /**
   * Get guests
   *
   * @return \Doctrine\Common\Collections\Collection
   */
  public function getGuests()
  {
    return $this->guests;
  }

  /**
   * @param mixed $guests
   */
  public function setGuests($guests)
  {
    $this->guests = $guests;
  }
}