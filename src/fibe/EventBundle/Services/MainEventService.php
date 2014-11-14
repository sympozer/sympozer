<?php

namespace fibe\EventBundle\Services;

use fibe\ContentBundle\Entity\MainEventLocation;
use fibe\EventBundle\Entity\MainEvent;
use fibe\RestBundle\Services\AbstractBusinessService;
use fibe\SecurityBundle\Entity\Team;
use fibe\SecurityBundle\Entity\User;
use fibe\SecurityBundle\Services\ACLUserPermissionHelper;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 * Class MainEventService
 * @package fibe\EventBundle\Services
 */
class MainEventService extends AbstractBusinessService
{

  protected $securityContext;
  protected $aclHelper;

  public function __construct(SecurityContextInterface $securityContext, ACLUserPermissionHelper $aclHelper)
  {
    $this->securityContext = $securityContext;
    $this->aclHelper = $aclHelper;
  }


  public function post(MainEvent $mainEvent = null)
  {
    /** @var $user User */
    $user = $this->securityContext->getToken()->getUser();
    if (null == $mainEvent)
    {
      $mainEvent = new MainEvent();
      $mainEvent->setLabel("Sympozer New Conference");
    }
    //$mainEvent->setLogoPath("sympozer-logo.png");
    if (!$mainEvent->getStartAt())
    {
      $mainEvent->setStartAt(new \DateTime('now'));
    }
    if (!$mainEvent->getEndAt())
    {
      $mainEvent->setEndAt(clone $mainEvent->getStartAt()->add(new \DateInterval('P2D')));
    }
    $this->entityManager->persist($mainEvent);


    // conference location
    $mainEventLocation = new MainEventLocation();
    $mainEventLocation->setLabel("Conference's location");
    $mainEventLocation->setMainEvent($mainEvent);
    $this->entityManager->persist($mainEventLocation);
    //$mainEvent->addLocation($mainEventLocation);
    $this->entityManager->persist($mainEvent);

    //conference categories


    //categories

    //abstract category

    // $OrganisedEvent = new Category();
    // $OrganisedEvent->setName("OrganisedEvent")
    //          ->setColor("#0EFF74") ;
    // $this->entityManager->persist($OrganisedEvent);

    // $NonAcademicEvent = new Category();
    // $NonAcademicEvent->setName("NonAcademicEvent")
    //                 ->setColor("#A6FF88")
    //                 ->setParent($OrganisedEvent);
    // $this->entityManager->persist($NonAcademicEvent);

    // $AcademicEvent = new Category();
    // $AcademicEvent->setName("AcademicEvent")
    //               ->setColor("#57A5C9")
    //               ->setParent($OrganisedEvent);
    // $this->entityManager->persist($AcademicEvent);

    // non academic

    /*$SocialEvent = new Category();
    $SocialEvent->setMainEvent($mainEvent)
      ->setLabel("Social event")
      ->setColor("#B186D7")// ->setParent($NonAcademicEvent)
    ;
    $this->entityManager->persist($SocialEvent);

    $MealEvent = new Category();
    $MealEvent->setMainEvent($mainEvent)
      ->setLabel("Meal Event")
      ->setColor("#00a2e0")// ->setParent($NonAcademicEvent)
    ;
    $this->entityManager->persist($MealEvent);

    $BreakEvent = new Category();
    $BreakEvent->setMainEvent($mainEvent)
      ->setLabel("Break event")
      ->setColor("#00a2e0")// ->setParent($NonAcademicEvent)
    ;
    $this->entityManager->persist($BreakEvent);

    // academic

    $KeynoteEvent = new Category();
    $KeynoteEvent->setMainEvent($mainEvent)
      ->setLabel("Keynote event")
      ->setColor("#afcbe0")// ->setParent($AcademicEvent)
    ;
    $this->entityManager->persist($KeynoteEvent);

    $TrackEvent = new Category();
    $TrackEvent->setMainEvent($mainEvent)
      ->setLabel("Track event")
      ->setColor("#afcbe0")// ->setParent($AcademicEvent)
    ;
    $this->entityManager->persist($TrackEvent);

    $PanelEvent = new Category();
    $PanelEvent->setMainEvent($mainEvent)
      ->setLabel("Panel event")
      ->setColor("#e7431e")// ->setParent($AcademicEvent)
    ;
    $this->entityManager->persist($PanelEvent);

    $ConferenceEvent = new Category();
    $ConferenceEvent->setMainEvent($mainEvent)
      ->setLabel("Conference event")
      ->setColor("#b0ca0f")// ->setParent($AcademicEvent)
    ;
    $this->entityManager->persist($ConferenceEvent);

    $WorkshopEvent = new Category();
    $WorkshopEvent->setMainEvent($mainEvent)
      ->setLabel("Workshop event")
      ->setColor("#EBD94E")// ->setParent($AcademicEvent)
    ;
    $this->entityManager->persist($WorkshopEvent);

    $SessionEvent = new Category();
    $SessionEvent->setMainEvent($mainEvent)
      ->setLabel("Session event")
      ->setColor("#8F00FF")// ->setParent($AcademicEvent)
    ;
    $this->entityManager->persist($SessionEvent);

    $TalkEvent = new Category();
    $TalkEvent->setMainEvent($mainEvent)
      ->setLabel("Talk event")
      ->setColor("#FF5A45")// ->setParent($AcademicEvent)
    ;
    $this->entityManager->persist($TalkEvent);*/

    //Team
    $defaultTeam = new Team();
    $defaultTeam->setMainEvent($mainEvent);
    $mainEvent->setTeam($defaultTeam);

    $this->entityManager->persist($defaultTeam);
    $this->entityManager->persist($user);
    $this->entityManager->persist($mainEvent);
    $this->entityManager->flush();

    //Create slug after persist => visibleon endpoint
    $mainEvent->slugify();
    $this->entityManager->persist($mainEvent);
    $this->entityManager->flush();

    $this->aclHelper->performUpdateUserACL($user, MaskBuilder::MASK_OWNER, $mainEvent);

    return $mainEvent;
  }

  /**
   * empty the given main event and recreate basic datas
   *
   * @param MainEvent $mainEvent
   */
  public function reset(MainEvent $mainEvent)
  {
    $this->removeObjects($mainEvent);

    $mainEvent->setLabel("New Sympozer Conference");
    $mainEvent->setStartAt(new \DateTime('now'));
    $end = new \DateTime('now');
    $mainEvent->setEndAt($end->add(new \DateInterval('P2D')));
//      $mainEvent->addCategorie($this->entityManager->getRepository('fibeEventBundle:Category')->findOneByName("ConferenceEvent"));

    //recreate main event location
    $mainEventLocation = new MainEventLocation();
    $mainEventLocation->setLabel("Conference's location");
    $mainEvent->setMainEventLocation($mainEventLocation);
    $mainEventLocation->setMainEvent($mainEvent);
    $this->entityManager->persist($mainEventLocation);

    $this->entityManager->remove($mainEvent);
    $this->entityManager->flush();
  }

  protected function removeObjects(MainEvent $mainEvent)
  {
    //  topics
    $topics = $mainEvent->getTopics();
    foreach ($topics as $topic)
    {
      $mainEvent->removeTopic($topic);
    }

    //  organizations
    $organizations = $mainEvent->getOrganizations();
    foreach ($organizations as $organization)
    {
      $mainEvent->removeOrganization($organization);
    }

    //  papers
    $papers = $mainEvent->getPapers();
    foreach ($papers as $paper)
    {
      $mainEvent->removePaper($paper);
    }

    //  locations
    $locations = $mainEvent->getEventLocations();
    foreach ($locations as $location)
    {
      $mainEvent->removeLocation($location);
    }

    //  persons
    $persons = $mainEvent->getPersons();
    foreach ($persons as $person)
    {
      $mainEvent->removePerson($person);
    }

    //  events
    $events = $mainEvent->getEvents();
    foreach ($events as $event)
    {
      $mainEvent->removeEvent($event);
      $this->entityManager->remove($event);
    }
  }

  /**
   * delete everything linked to a main but but the main event itself
   *
   * @param MainEvent $mainEvent
   */
  public function delete(MainEvent $mainEvent)
  {
    $this->removeObjects($mainEvent);

    //team
    $team = $mainEvent->getTeam();
    if ($team)
    {
      $mainEvent->setTeam(null);
      $this->entityManager->flush();
      $this->entityManager->remove($team);
      $this->entityManager->flush();
    }

    $this->entityManager->flush();
    $this->entityManager->remove($mainEvent);
    $this->entityManager->flush();
  }

}
