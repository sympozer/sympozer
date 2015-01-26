<?php

namespace fibe\CommunityBundle\Entity;

use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * This entity complete informations on a person or on an organization as well
 *
 *
 * @ORM\Table(name="agent")
 * @ORM\Entity(repositoryClass="fibe\CommunityBundle\Repository\AgentRepository")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\HasLifecycleCallbacks
 * @ORM\DiscriminatorMap({
 *     "Organization"="Organization",
 *     "Person"="Person"
 * })
 * @ExclusionPolicy("all")
 */
class Agent
{
    /**
     * fix an issue with jms-serializer and form validation when applied to a doctrine InheritanceType("SINGLE_TABLE")
     */
    public $dtype;
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue()
     * @Expose
     * @Groups({"list"})
     */
    protected $id;

    /**
     * Url of the website
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $website;
    /**
     * Url of the twitter
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $twitter;
    /**
     * Url of the facebook
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $facebook;
    /**
     * Url of the linkedIn
     *
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     * @SerializedName("linkedIn")
     */
    protected $linkedIn;
    /**
     * @TODO Enum : I18N (CodeInfo/JS/...)
     *
     * country
     * @ORM\Column(type="string", nullable=true)
     * @Expose
     */
    protected $country;
    /**
     * img
     * @ORM\Column(type="text", nullable=true, length=2056, name="img")
     * @Expose
     * @Groups({"list"})
     */
    protected $img;
    /**
     * email
     * @ORM\Column(type="string", nullable=true,  name="email")
     * @Expose
     */
    protected $email;
    /**
     * @ORM\Column(type="text", length=2056, nullable=true)
     * @Expose
     * @Groups({"list"})
     */
    protected $description;
    /**
     * Localization
     * Localization is a geographic point and geocoding information that indicate where the person/organization resides
     * @ORM\OneToOne(targetEntity="fibe\ContentBundle\Entity\Localization")
     * @Expose
     */
    protected $localization;

    public function __toString()
    {
        //@TODO : méthode to String fonctionnel
        return 'toString @TODO in AdditionalInformation Entity';
    }

    /**
     * cascade updates on localization
     * @ORM\PreFlush
     */
    public function updateLocalization(PreFlushEventArgs $eventArgs)
    {
        if (!$this->getId() || !$this->getLocalization())
        {
            return;
        }
        $em = $eventArgs->getEntityManager();
        $uow = $em->getUnitOfWork();
        try
        {

            $uow->recomputeSingleEntityChangeSet(
                $em->getClassMetadata(get_class($this->getLocalization())),
                $this->getLocalization()
            );
        } catch (\RuntimeException $e)
        {
            //append in sonata admin bundle
        }
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
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getLocalization()
    {
        return $this->localization;
    }

    /**
     * @param mixed $localization
     */
    public function setLocalization($localization)
    {
        $this->localization = $localization;
    }

    /**
     * @return mixed
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * @param mixed $website
     */
    public function setWebsite($website)
    {
        $this->website = $website;
    }

    /**
     * @return mixed
     */
    public function getFacebook()
    {
        return $this->facebook;
    }

    /**
     * @param mixed $facebook
     */
    public function setFacebook($facebook)
    {
        $this->facebook = $facebook;
    }

    /**
     * @return mixed
     */
    public function getLinkedIn()
    {
        return $this->linkedIn;
    }

    /**
     * @param mixed $linkedIn
     */
    public function setLinkedIn($linkedIn)
    {
        $this->linkedIn = $linkedIn;
    }

    /**
     * @return mixed
     */
    public function getTwitter()
    {
        return $this->twitter;
    }

    /**
     * @param mixed $twitter
     */
    public function setTwitter($twitter)
    {
        $this->twitter = $twitter;
    }

    /**
     * @return mixed
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param mixed $country
     */
    public function setCountry($country)
    {
        $this->country = $country;
    }

    /**
     * @return mixed
     */
    public function getImg()
    {
        return $this->img;
    }

    /**
     * @param mixed $img
     */
    public function setImg($img)
    {
        $this->img = $img;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

}