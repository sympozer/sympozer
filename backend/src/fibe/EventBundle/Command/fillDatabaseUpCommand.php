<?php
namespace fibe\EventBundle\Command;

use fibe\CommunityBundle\Entity\Organization;
use fibe\CommunityBundle\Entity\Person;
use fibe\MobileAppBundle\Entity\MobileAppConfig;
use fibe\ContentBundle\Entity\Module;
use fibe\ContentBundle\Entity\Paper;
use fibe\ContentBundle\Entity\Role;
use fibe\ContentBundle\Entity\RoleLabel;
use fibe\ContentBundle\Entity\Topic;
use fibe\EventBundle\Entity\MainEvent;
use fibe\EventBundle\Entity\Category;
use fibe\ContentBundle\Entity\Location;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


/**
 * Initialization command for filling the DataBase
 *
 * Class fillDatabaseUpCommand
 * @package fibe\EventBundle\Command
 */
class fillDatabaseUpCommand extends ContainerAwareCommand
{
  protected function configure()
  {
    $this
      ->setName('sympozer:database:full')
      ->setDescription('Insert lots of data in the database');
  }

  /**
   * Executes the current command.
   *
   * This method is not abstract because you can use this class
   * as a concrete class. In this case, instead of defining the
   * execute() method, you set the code to execute by passing
   * a Closure to the setCode() method.
   *
   * @param InputInterface $input An InputInterface instance
   * @param OutputInterface $output An OutputInterface instance
   *
   * @return null|integer null or 0 if everything went fine, or an error code
   *
   * @throws \LogicException When this abstract method is not implemented
   * @see    setCode()
   */
  protected function execute(InputInterface $input, OutputInterface $output)
  {

    $em = $this->getContainer()->get('doctrine')->getManager('default');


    //RoleType
    $roleType = new RoleLabel();
    $roleType->setLabel("Delegate");
    $em->persist($roleType);

    $roleTypeChair = new RoleLabel();
    $roleTypeChair->setLabel("Chair");
    $em->persist($roleTypeChair);

    $roleTypePresenter = new RoleLabel();
    $roleTypePresenter->setLabel("Presenter");
    $em->persist($roleTypePresenter);

    $roleType = new RoleLabel();
    $roleType->setLabel("Programme Committee Member");
    $em->persist($roleType);

    //Social Service
    // $socialService = new SocialService();
    // $socialService->setLabel("Facebook");
    // $em->persist($socialService);

    // $socialService = new SocialService();
    // $socialService->setLabel("Twitter");
    // $em->persist($socialService);

    // $socialService = new SocialService();
    // $socialService->setLabel("LinkedIn");
    // $em->persist($socialService);

    // //Equipments
    // $equipment = new Equipment();
    // $equipment->setLabel("Computer")
    //           ->setIcon("laptop");
    // $em->persist($equipment);

    // $equipment = new Equipment();
    // $equipment->setLabel("Speaker")
    //           ->setIcon("volume-up");
    // $em->persist($equipment);

    // $equipment = new Equipment();
    // $equipment->setLabel("Wifi")
    //           ->setIcon("rss");
    // $em->persist($equipment);

    // $equipment = new Equipment();
    // $equipment->setLabel("Screen")
    //           ->setIcon("film");
    // $em->persist($equipment);

    // $equipment = new Equipment();
    // $equipment->setLabel("OHP")
    //           ->setIcon("video-camera");
    // $em->persist($equipment);

    // $equipment = new Equipment();
    // $equipment->setLabel("Microphone")
    //           ->setIcon("microphone");
    // $em->persist($equipment);

    //Topic
    /* $topic = new Topic();
     $topic->setLabel("Business");
     $em->persist($topic);

     $topic = new Topic();
     $topic->setLabel("Design");
     $em->persist($topic);

     $topic = new Topic();
     $topic->setLabel("Marketing");
     $em->persist($topic);

     $topic = new Topic();
     $topic->setLabel("Recherche");
     $em->persist($topic);

     $topic = new Topic();
     $topic->setLabel("Tech");
     $em->persist($topic);*/


    $OrganisedEvent = new Category();
    $OrganisedEvent->setLabel("Organized Event")
      ->setColor("#0EFF74")
      ->setLevel(3);
    $em->persist($OrganisedEvent);

    $NonAcademicEvent = new Category();
    $NonAcademicEvent->setLabel("Non Academic Event")
      ->setColor("#A6FF88")
      ->setLevel(3);
    $em->persist($NonAcademicEvent);

    $AcademicEvent = new Category();
    $AcademicEvent->setLabel("Academic Event")
      ->setColor("#57A5C9")
      ->setLevel(3);
    $em->persist($AcademicEvent);

    $SocialEvent = new Category();
    $SocialEvent->setLabel("Social Event")
      ->setColor("#B186D7")
      ->setLevel(3);
    $em->persist($SocialEvent);

    $MealEvent = new Category();
    $MealEvent->setLabel("Meal Event")
      ->setColor("#00a2e0")
      ->setLevel(3);
    $em->persist($MealEvent);

    $BreakEvent = new Category();
    $BreakEvent->setLabel("Break event")
      ->setColor("#00a2e0")
      ->setLevel(3);
    $em->persist($BreakEvent);

    $KeynoteEvent = new Category();
    $KeynoteEvent->setLabel("Keynote event")
      ->setColor("#afcbe0")
      ->setLevel(3);
    $em->persist($KeynoteEvent);

    $TrackEvent = new Category();
    $TrackEvent->setLabel("Track event")
      ->setColor("#afcbe0")
      ->setLevel(1);
    $em->persist($TrackEvent);

    $PanelEvent = new Category();
    $PanelEvent->setLabel("Panel Event")
      ->setColor("#e7431e")
      ->setLevel(3);
    $em->persist($PanelEvent);

    $ConferenceEvent = new Category();
    $ConferenceEvent->setLabel("Conference Event")
      ->setColor("#b0ca0f")
      ->setLevel(0);
    $em->persist($ConferenceEvent);

    $WorkshopEvent = new Category();
    $WorkshopEvent->setLabel("Workshop event")
      ->setColor("#EBD94E")
      ->setLevel(3);
    $em->persist($WorkshopEvent);

    $SessionEvent = new Category();
    $SessionEvent->setLabel("Session event")
      ->setColor("#8F00FF")
      ->setLevel(2);
    $em->persist($SessionEvent);

    $TalkEvent = new Category();
    $TalkEvent->setLabel("Talk event")
      ->setColor("#FF5A45")
      ->setLevel(0);
    $em->persist($TalkEvent);

    $em->flush();

    $output->writeln("common rows inserted successfully");

    for ($counter = 0; $counter <= 1; $counter += 1)
    {
      // get a fresh EM
      $container = $this->getContainer();
      $container->set('doctrine.orm.default', null);
      $container->set('doctrine.orm.entity_manager', null);
      $container->set('doctrine.orm.default_entity_manager', null);
      $this->createConf($counter, 3000, $output, $roleType, $roleTypeChair, $roleTypePresenter);
    }

  }

  /**
   * Create a conference in the database
   *
   * @param $counter @TODO comment
   * @param $limit @TODO comment
   * @param $output @TODO comment
   * @param $roleType @TODO comment
   * @param $roleTypeChair @TODO comment
   * @param $roleTypePresenter @TODO comment
   */
  function createConf($counter, $limit, $output, $roleType, $roleTypeChair, $roleTypePresenter)
  {

    $output->writeln("conference " . $counter . " started");
    $em = $this->getContainer()->get('doctrine')->getManager('default');
    //Create the default conference
    $conference = new MainEvent();
    $conference->setLogoPath("sympozer-.png");
    $em->persist($conference);

    //Module
    $defaultModule = new Module();
    $defaultModule->setPaperModule(1);
    $defaultModule->setOrganizationModule(1);
    $em->persist($defaultModule);

    //Create new App config for the conference
    $defaultAppConfig = new MobileAppConfig();

    //header color
    $defaultAppConfig->setBGColorHeader("#f2f2f2");
    $defaultAppConfig->setTitleColorHeader("#000000");
    //navBar color
    $defaultAppConfig->setBGColorNavBar("#305c6b");
    $defaultAppConfig->setTitleColorNavBar("#f3f6f6");
    //content color
    $defaultAppConfig->setBGColorContent("#f3f6f6");
    $defaultAppConfig->setTitleColorContent("#8c949c");
    //buttons color
    $defaultAppConfig->setBGColorButton("#f3f6f6");
    $defaultAppConfig->setTitleColorButton("#000000");
    //footer color
    $defaultAppConfig->setBGColorfooter("#305c6b");
    $defaultAppConfig->setTitleColorFooter("#f3f6f6");
    $defaultAppConfig->setIsPublished(true);
    $defaultAppConfig->setDblpDatasource(true);
    $defaultAppConfig->setGoogleDatasource(true);
    $defaultAppConfig->setDuckduckgoDatasource(true);
    $defaultAppConfig->setLang("EN");

    $em->persist($defaultAppConfig);


    //Main conf event
    $mainEvent = new ConfEvent();
    $mainEvent->setSummary("Big Sympozer Conference" . $counter);
    $mainEvent->setIsMainConfEvent(true);
    $mainEvent->setStartAt(new \DateTime('now'));
    $end = new \DateTime('now');
    $mainEvent->setEndAt($end->add(new \DateInterval('P2D')));
    $mainEvent->setMainEvent($conference);
    $mainEvent->setComment("Sympozer Conference " . $counter . " comment");
    $mainEvent->setUrl("http://sympozerconference" . $counter);
    $em->persist($mainEvent);


    // conference location
    $mainEventLocation = new Location();
    $mainEventLocation->setLabel("Conference's location");
    $mainEventLocation->addVEvent($mainEvent);
    $mainEventLocation->setMainEvent($conference);
    $em->persist($mainEventLocation);
    $mainEvent->setLocation($mainEventLocation);
    $em->persist($mainEvent);

    //Linking app config to conference
    $conference->setAppConfig($defaultAppConfig);
    $conference->setMainConfEvent($mainEvent);
    $conference->setModule($defaultModule);

    //Add conference to current manager


    $em->persist($conference);


    //Create slug after persist => visibleon endpoint
    $conference->slugify();
    $em->persist($conference);

    $location = null;

    for ($counterLoc = 0; $counterLoc <= $limit / 10; $counterLoc += 1)
    {

      $location = new Location();
      $location->setLabel("location" . $counterLoc);
      $em->persist($location);
    }
    $em->flush();

    for ($counterEnt = 0; $counterEnt <= $limit; $counterEnt += 1)
    {
      $person = new Person();
      $person->setMainEvent($conference);
      $person->setFamilyName("person" . $counterEnt);
      $person->setFirstName("person" . $counterEnt);
      $person->setLabel("person" . $counterEnt);
      $person->setDescription("person " . $counterEnt . " description descriptiondescription description description description description description description description description description description ");
      $person->setImg("http://png-4.findicons.com/files/icons/61/dragon_soft/128/user.png");
      $person->setEmail("email@lol.fr");
      $person->setPage("mypersonnalpage.com");


      $organization = new Organization();
      $organization->setMainEvent($conference);
      $organization->setLabel("organization" . $counterEnt);
      $organization->setPage("organization page" . $counterEnt);
      $organization->setCountry("organization country" . $counterEnt);
      $person->addOrganization($organization);
      $organization->addMember($person);

      $topic = new Topic();
      $topic->setLabel("topic" . $counterEnt);
      $topic->setMainEvent($conference);

      $paper = new Paper();
      $paper->setMainEvent($conference);
      $paper->setTitle("paper" . $counterEnt);
      $paper->setUrl("paper url" . $counterEnt);
      $paper->setAbstract("paper" . $counterEnt . "abstact abstact abstact abstact abstact abstact abstact abstact abstact abstact abstact abstact abstact abstact abstact abstact abstact ");
      $paper->addTopic($topic);
      $paper->addAuthor($person);

      $event = new ConfEvent();
      $event->setMainEvent($conference);
      $event->setStartAt(new \DateTime('now'));
      $end = new \DateTime('now');
      $event->setEndAt($end->add(new \DateInterval('P2D')));
      $event->setSummary("event " . $counterEnt);
      $event->setAttach("event attach" . $counterEnt);
      $event->setDescription("event " . $counterEnt . " description : description description description description description description description description description description description description ");
      $event->addPaper($paper);
      $event->setLocation($location);

      $role = new Role();
      $role->setMainEvent($conference);
      $role->setPerson($person);
      $role->setEvent($event);
      $role->setType($roleTypePresenter);


      $em->persist($roleTypePresenter);
      $em->persist($organization);
      $em->persist($paper);
      $em->persist($topic);
      $em->persist($role);
      $em->persist($event);
      $em->persist($person);

    }
    $em->flush();
    $em->close();
  }
}
