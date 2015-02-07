<?php
namespace fibe\EventBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Event\PreFlushEventArgs;
use Doctrine\ORM\Mapping as ORM;
use fibe\ContentBundle\Entity\Location;
use fibe\ContentBundle\Entity\Sponsor;
use fibe\ContentBundle\Entity\Topic;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * This entity is based on the "VEVENT" components
 * describe in the RFC2445
 *
 * Purpose: Provide a grouping of component properties that describe
 * a schedulable element.
 *
 * @ORM\Entity(repositoryClass="fibe\EventBundle\Repository\VEventRepository")
 * @ORM\Table(name="vevent")
 * @ExclusionPolicy("all")
 * @ORM\HasLifecycleCallbacks
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorMap({
 *     "Event"="Event",
 *     "MainEvent"="MainEvent"
 * })
 */
abstract class VEvent
{
    // Status values for "EVENT"
    const STATUS_EVENT_CANCELLED = "CANCELLED"; // Indicates event was cancelled.
    const STATUS_EVENT_CONFIRMED = "CONFIRMED"; // Indicates event is definite.
    const STATUS_EVENT_TENTATIVE = "TENTATIVE"; // Indicates event is tentative.

    const CLASSIFICATION_PUBLIC = "PUBLIC";
    const CLASSIFICATION_PRIVATE = "PRIVATE";

    const DEFAULT_EVENT_DURATION = '+2 hour';
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


    protected $startAt;
    protected $label;

    /**
     * description
     *
     * This property provides a more complete description of the
     * calendar component, than that provided by the "SUMMARY" property.
     *
     * @ORM\Column(type="text", nullable=true)
     * @Expose
     * @Groups({"list"})
     */
    protected $description;

//  /**
//   * organizer
//   *
//   * Purpose: The property defines the organizer for a calendar component.
//   *
//   * @TODO EVENT
//   * ==>
//   * Here in Sympozer, the owner of the event is
//   * the most responsible person of the event
//   * <==
//   *
//   * The following is an example of this property:
//   * ORGANIZER;CN=John Smith:MAILTO:jsmith@host1.com
//   */
//  protected $organizer;
    /**
     * comment
     *
     * This property specifies non-processing information intended
     * to provide a comment to the calendar user.
     *
     * @ORM\Column(type="string", length=4047, nullable=true)
     */
    protected $comment;

//  /**
//   * contact
//   *
//   * The property is used to represent contact information or
//   * alternately a reference to contact information associated with the
//   * calendar component.
//   *
//   * ==>
//   * @TODO EVENT : à réfléchir... Ne pas persister en base, mais déduire
//   * la propriété de manière logiqu avec la table attendee
//   * <==
//   */
//  protected $contacts;

//  /**
//   * class
//   *
//   * This property defines the access classification for a calendar component.
//   *
//   * class      = "CLASS" classparam ":" classvalue CRLF
//   * classparam = *(";" xparam)
//   * classvalue = "PUBLIC" / "PRIVATE" / "CONFIDENTIAL"
//   * Default is PUBLIC
//   *
//   * ==>
//   * @TODO EVENT : à réfléchir... Ne pas persister en base, mais déduire
//   * la propriété de manière logique avec la table atendee
//   * <==
//   */
//  protected $classification = self::CLASSIFICATION_PUBLIC;
    /**
     * sequence
     *
     * This property defines the revision sequence number of the
     * calendar component within a sequence of revisions.
     *
     * Description: When a calendar component is created, its sequence
     * number is zero (US-ASCII decimal 48). It is monotonically incremented
     * by the "Organizer's" CUA each time the "Organizer" makes a
     * significant revision to the calendar component. When the "Organizer"
     * makes changes to one of the following properties, the sequence number
     * MUST be incremented:
     * .  "DTSTART"
     * .  "DTEND"
     * .  "DUE"
     * .  "RDATE"
     * .  "RRULE"
     * .  "EXDATE"
     * .  "EXRULE"
     * .  "STATUS"
     *
     * @ORM\Column(type="integer", name="revision_sequence")
     */
    protected $revisionSequence = 0;
    /**
     * status
     *
     * @ORM\Column(type="string", length=32, nullable=true)
     * @Assert\Choice(multiple=false, choices = {"CANCELLED","CONFIRMED","TENTATIVE"}, strict=false, message = "Choose a valid status.")
     */
    protected $status = self::CLASSIFICATION_PUBLIC;
    /**
     * priority
     *
     * The property defines the relative priority for a calendar
     * component.
     *
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Range(
     *     min = "0",
     *     max = "9",
     *     minMessage = "priority must be at least 0",
     *     maxMessage = "priority must be at max 9"
     * )
     */
    protected $priority;
    /**
     * Topic
     *
     * @ORM\ManyToMany(targetEntity="fibe\ContentBundle\Entity\Topic", inversedBy="vEvents", cascade={"all"})
     * @ORM\JoinTable(name="vevent_topic",
     *     joinColumns={@ORM\JoinColumn(name="vevent_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="topic_id", referencedColumnName="id")})
     * @Expose
     */
    protected $topics;
    /**
     * Sponsors related to a VEvent
     *
     * @ORM\OneToMany(targetEntity="fibe\ContentBundle\Entity\Sponsor", mappedBy="vEvent", cascade={"persist"})
     * @ORM\JoinColumn(name="sponsor_id", referencedColumnName="id", onDelete="cascade")
     */
    protected $sponsors;

    /**
     * url
     *
     * This property defines a Uniform Resource Locator (URL)
     * associated with the iCalendar object.
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     * @expose
     */
    protected $url;

    /**
     * twitter hashtag
     *
     * This property defines the hashtag of the event resource
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     * @expose
     */
    protected $twitter;

    /**
     * share
     *
     * This property defines whether we display share buttons or not
     *
     * @ORM\Column(type="boolean")
     * @Expose
     */
    protected $share = true;

    /**
     * youtube
     * This property defines the youtube id of the event resource
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     * @expose
     */
    protected $youtube;

    /**
     * facebook
     *
     * This property defines the facebook id of the event resource
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     * @expose
     */
    protected $facebook;

    /**
     * created_at
     *
     * This property specifies the date and time that the calendar
     * information was created by the calendar user agent in the calendar
     * store.
     *
     * @ORM\Column(type="datetime", name="created_at")
     */
    protected $createdAt;
    /**
     * modified_at
     *
     * The property specifies the date and time that the
     * information associated with the calendar component was last revised
     * in the calendar store.
     *
     * @ORM\Column(type="datetime", name="last_modified_at")
     */
    protected $lastModifiedAt;
    /**
     * Locations for the event
     * @Expose
     * @Groups({"list"})
     * @ORM\ManyToOne(targetEntity="fibe\ContentBundle\Entity\Location", inversedBy="events")
     * @ORM\JoinTable(name="vevent_location",
     *     joinColumns={@ORM\JoinColumn(name="event_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="location_id", referencedColumnName="id")})
     */
    protected $location;

    /**
     * constructor
     */
    public function __construct()
    {
        $this->topics = new ArrayCollection();
        $this->sponsors = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->lastModifiedAt = new \DateTime();
        $this->status = self::STATUS_EVENT_CONFIRMED;
        $this->setRevisionSequence($this->getRevisionSequence() + 1);
    }

    /**
     * Get revisionSequence
     *
     * @return integer
     */
    public function getRevisionSequence()
    {
        return $this->revisionSequence;
    }

    /**
     * Set revisionSequence
     *
     * @param integer $revisionSequence
     *
     * @return $this
     */
    public function setRevisionSequence($revisionSequence)
    {
        $this->revisionSequence = $revisionSequence;

        return $this;
    }

    /**
     * toString
     *
     * @return string
     */
    public function __toString()
    {
        $startAt = $this->getStartAt();

        return sprintf("%d] start at %s : %s",
            $this->getId(),
            isset($startAt) ? $startAt->format('Y-m-d') : null,
            $this->getLabel()
        );
    }

    /**
     * @return mixed
     */
    public function getStartAt()
    {
        return $this->startAt;
    }

    /**
     * @param mixed $startAt
     */
    public function setStartAt($startAt)
    {
        $this->startAt = $startAt;
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
     * Modify start & end in order to fit to events' children.
     * Do nothing if the event doesn't have children.
     * Add one day if the children are all instant and on the same moment.
     *
     * @return bool
     */

    /**
     * Get createdAt
     *
     * @return \DateTime
     */

    /*public function fitChildrenDate()
    {
        $earliestStart = new \DateTime('6000-10-10');
        $latestEnd = new \DateTime('1000-10-10');
        foreach ($this->getChildren() as $child)
        {
            // @var Event $child
            if ($child->getIsInstant())
            {
                continue;
            }
            if ($child->getStartAt() < $earliestStart)
            {
                $earliestStart = $child->getStartAt();
            }
            if ($child->getEndAt() > $latestEnd)
            {
                $latestEnd = $child->getEndAt();
            }
        }
        //if $earliestStart && $latestEnd were changed
        if ($earliestStart != new \DateTime('6000-10-10') && $latestEnd != new \DateTime('1000-10-10'))
        {
            if ($earliestStart == $latestEnd)
            {
                $latestEnd->add(new \DateInterval('P1D'));
            }
            if ($earliestStart->getTimestamp() != $this->getStartAt()->getTimestamp() || $latestEnd->getTimestamp() != $this->getEndAt()->getTimestamp())
            {
                $this->setStartAt($earliestStart);
                $this->setEndAt($latestEnd);

                return true;
            }
        }

        return false;
    }*/

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
     * onCreation
     *
     * @ORM\PrePersist()
     */
    public function onCreation()
    {
        $now = new \DateTime('now');
        $this->setCreatedAt($now);
        $this->setLastModifiedAt($now);
    }

    /**
     * onUpdate
     *
     * @ORM\PreUpdate()
     */
    public function onUpdate()
    {
        $now = new \DateTime('now');
        $this->setLastModifiedAt($now);
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */

    /**
     * uid
     *
     * This property defines the persistent, globally unique
     * identifier for the calendar component.
     * Description: The UID itself MUST be a globally unique identifier. The
     * generator of the identifier MUST guarantee that the identifier is
     * unique. There are several algorithms that can be used to accomplish
     * this. The identifier is RECOMMENDED to be the identical syntax to the
     * [RFC 822] addr-spec. A good method to assure uniqueness is to put the
     * domain name or a domain literal IP address of the host on which the
     * identifier was created on the right hand side of the "@", and on the
     * left hand side, put a combination of the current calendar date and
     * time of day (i.e., formatted in as a DATE-TIME value) along with some
     * other currently unique (perhaps sequential) identifier available on
     * the system (for example, a process id number). Using a date/time
     * value on the left hand side and a domain name or domain literal on
     * the right hand side makes it possible to guarantee uniqueness since
     * no two hosts should be using the same domain name or IP address at
     * the same time. Though other algorithms will work, it is RECOMMENDED
     * that the right hand side contain some domain identifier (either of
     * the host itself or otherwise) such that the generator of the message
     * identifier can guarantee the uniqueness of the left hand side within
     * the scope of that domain.
     *
     * @param String $domain the server domain name or ip address
     *
     * @return String A unique UID
     */
    public function getUID($domain = 'default')
    {
        return sprintf('%s-%d@%s',
            $this->getFormatedStartAt(),
            $this->getId(),
            $domain
        );
    }

    /**
     * getFormatedStartAt
     *
     * @param $format   String the datetime format
     * @param $timezone String the timezone name
     *
     * @return String the formated datetime
     */
    public function getFormatedStartAt($format = \DateTime::RFC1123, $timezone = 'Europe/Paris')
    {
        $dt = $this->getStartAt();
        $dt->setTimeZone(new \DateTimezone($timezone));

        return $dt->format($format);
    }


    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return $this
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get lastModifiedAt
     *
     * @return \DateTime
     */
    public function getLastModifiedAt()
    {
        return $this->lastModifiedAt;
    }

    /**
     * Set lastModifiedAt
     *
     * @param \DateTime $lastModifiedAt
     *
     * @return $this
     */
    public function setLastModifiedAt(\DateTime $lastModifiedAt)
    {
        $this->lastModifiedAt = $lastModifiedAt;

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
     * Get comment
     *
     * @return string
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * Set comment
     *
     * @param string $comment
     *
     * @return $this
     */
    public function setComment($comment)
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return $this
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get status
     *
     * @return String
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set status
     *
     * @param String $status
     *
     * @return $this
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get location
     *
     * @return Location
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * Set location
     *
     * @param Location $location
     *
     * @return $this
     */
    public function setLocation(Location $location = null)
    {
        $this->location = $location;

        return $this;
    }

    /**
     * Add sponsors
     *
     * @param Sponsor $sponsor
     *
     * @return $this
     */
    public function addSponsor(Sponsor $sponsor)
    {
        $this->sponsors[] = $sponsor;

        return $this;
    }

    /**
     * Remove sponsors
     *
     * @param Sponsor $sponsor
     */
    public function removeSponsor(Sponsor $sponsor)
    {
        $this->sponsors->removeElement($sponsor);
    }

    /**
     * Get sponsors
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSponsors()
    {
        return $this->sponsors;
    }

    /**
     * @param mixed $sponsors
     */
    public function setSponsors($sponsors)
    {
        $this->sponsors = $sponsors;
    }

    /**
     * Add topics
     *
     * @param Topic $topic
     *
     * @return $this
     */
    public function addTopic(Topic $topic)
    {
        $this->topics[] = $topic;

        return $this;
    }

    /**
     * Remove topics
     *
     * @param Topic $topic
     */
    public function removeTopic(Topic $topic)
    {
        $this->topics->removeElement($topic);
    }

    /**
     * @return mixed
     */
    public function getPriority()
    {
        return $this->priority;
    }

    /**
     * @param mixed $priority
     */
    public function setPriority($priority)
    {
        $this->priority = $priority;
    }

    /**
     * @return mixed
     */
    public function getTopics()
    {
        return $this->topics;
    }

    /**
     * @param mixed $topics
     */
    public function setTopics($topics)
    {
        $this->topics = $topics;
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
     * @return bool
     */
    public function getShare()
    {
        return $this->share;
    }

    /**
     * @param bool $share
     */
    public function setShare($share)
    {
        $this->share = $share;
    }

    /**
     * @return mixed
     */
    public function getYoutube()
    {
        return $this->youtube;
    }

    /**
     * @param mixed $youtube
     */
    public function setYoutube($youtube)
    {
        $this->youtube = $youtube;
    }

    /**
     * auto persist of embedded data
     * @ORM\PreFlush
     */
    public function updateSomething(PreFlushEventArgs $eventArgs)
    {
//        if (!$this->getId() || !$this->getLocation())
//        {
//            return;
//        }
//        $em = $eventArgs->getEntityManager();
//        $uow = $em->getUnitOfWork();
//
//        if($this->getLocation()->getLabel() != null){
//            // $uow->computeChangeSets();
//            $uow->persist($this->getLocation());
////            $uow->recomputeSingleEntityChangeSet(
////                $em->getClassMetadata(get_class($this->getLocation())),
////                $this->getLocation()
////            );
//        }
    }


}