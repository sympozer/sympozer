<?php
namespace fibe\EventBundle\Controller;

use fibe\CommunityBundle\Entity\Organization;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use fibe\EventBundle\Entity\VEvent as Event;
use fibe\CommunityBundle\Entity\Person;
use fibe\ContentBundle\Entity\Topic;
use fibe\ContentBundle\Entity\Paper;
use fibe\ContentBundle\Entity\Role;
use fibe\ContentBundle\Entity\RoleLabel;
use fibe\CommunityBundle\Entity\SocialService;
use fibe\CommunityBundle\Entity\SocialServiceAccount;
use fibe\EventBundle\Entity\Category;
use fibe\ContentBundle\Entity\Location;

use fibe\ContentBundle\Util\StringTools;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;


/**
 * Api controller.
 *
 * @Route("/admin/link/DBimport")
 */
class DBImportController extends Controller
{
  private $eventEntities = array();
  private $personEntities = array();
  private $locationEntities = array();
  private $categoryEntities = array();
  private $topicEntities = array();
  private $organizationEntities = array();
  private $proceedingEntities = array();
  private $conference;
  private $defaultCategory;

  /**
   * @Route("/", name="schedule_import")
   */
  public function importAction(Request $request)
  {
    //Authorization Verification conference sched manager
    $this->get('fibe_security.acl_entity_helper')->getEntityACL('CREATE', 'MainEvent');

    $JSONFile = json_decode($request->request->get('dataArray'), true);

    $em = $this->getDoctrine()->getManager();

    $this->conference = $this->getUser()->getCurrentMainEvent();


    $entity = null;


    $mainEvent = $this->conference->getMainConfEvent();

    $this->defaultCategory = $this->getDoctrine()
      ->getRepository('fibeEventBundle:Category')
      ->findOneBy(array('name' => 'TalkEvent'));


    //////////////////////  topics  //////////////////////
    if (isset($JSONFile['topics']))
    {
      $topics = $JSONFile['topics'];
      for ($i = 0; $i < count($topics); $i++)
      {
        $current = $topics[$i];
        $existsTest = $this->getDoctrine()
          ->getRepository('fibeContentBundle:Topic')
          ->findOneBy(array('name' => $current['setName'], 'conference' => $this->conference->getId()));
        if ($existsTest != null)
        {
          array_push($this->topicEntities, $existsTest);
          continue; //skip existing topic
        }
        $entity = new Topic();
        foreach ($current as $setter => $value)
        {

          call_user_func_array(array($entity, $setter), array($value));
        }
        $entity->setMainEvent($this->conference);
        $em->persist($entity);
        array_push($this->topicEntities, $entity);
      }
      $topics = null;
    }

    //////////////////////  locations  //////////////////////
    if (isset($JSONFile['locations']))
    {
      $locations = $JSONFile['locations'];
      for ($i = 0; $i < count($locations); $i++)
      {
        $current = $locations[$i];
        $existsTest = $this->getDoctrine()
          ->getRepository('fibeContentBundle:Location')
          ->findOneBy(array('name' => $current['setName'], 'conference' => $this->conference->getId()));
        if ($existsTest != null)
        {
          array_push($this->locationEntities, $existsTest);
          continue; //skip existing location
        }
        $entity = new Location();
        foreach ($current as $setter => $value)
        {

          call_user_func_array(array($entity, $setter), array($value));
        }
        $entity->setMainEvent($this->conference);
        $em->persist($entity);
        array_push($this->locationEntities, $entity);
      }
      $locations = null;
    }

    //////////////////////  organizations  //////////////////////
    if (isset($JSONFile['organizations']))
    {
      $organizations = $JSONFile['organizations'];
      for ($i = 0; $i < count($organizations); $i++)
      {
        $current = $organizations[$i];
        $existsTest = $this->getDoctrine()
          ->getRepository('fibeContentBundle:Organization')
          ->findOneBy(array('name' => $current['setName'], 'conference' => $this->conference->getId()));
        if ($existsTest != null)
        {
          array_push($this->organizationEntities, $existsTest);
          continue; //skip existing organization
        }

        $entity = new Organization();
        foreach ($current as $setter => $value)
        {

          call_user_func_array(array($entity, $setter), array($value));
        }
        $entity->setMainEvent($this->conference);
        $em->persist($entity);
        array_push($this->organizationEntities, $entity);
      }
      $organizations = null;
    }

    //////////////////////  persons  //////////////////////
    if (isset($JSONFile['persons']))
    {
      $entities = $JSONFile['persons'];
      for ($i = 0; $i < count($entities); $i++)
      {
        $current = $entities[$i];

        $entity = new Person();
        foreach ($current as $setter => $value)
        {

          if ($setter == "setTwitter")
          {
            //get twitter entity
            $ss = $this->getDoctrine()
              ->getRepository('fibeCommunityBundle:SocialService')
              ->findOneBy(array('name' => 'Twitter'));
            //create account
            $ssa = new SocialServiceAccount();
            $ssa->setAccountName($value)
              ->setSocialService($ss);
            $value = $ssa;
            $setter = 'addAccount';
          }
          if (is_array($value))
          {
            switch ($setter)
            {
              case 'addOrganization':
                $entityArray = $this->organizationEntities;
                break;
              default:
                $entityArray = null;
                break;
            }
            $this->doArray($entityArray, $entity, $setter, $value);
          }
          else
          {
            call_user_func_array(array($entity, $setter), array($value));
          }
        }

        $entity->setMainEvent($this->conference);
        $em->persist($entity);
        array_push($this->personEntities, $entity);
      }
      $entities = null;
    }


    //////////////////////  proceedings  //////////////////////
    if (isset($JSONFile['proceedings']))
    {
      $proceedings = $JSONFile['proceedings'];
      for ($i = 0; $i < count($proceedings); $i++)
      {
        $current = $proceedings[$i];
        $existsTest = $this->getDoctrine()
          ->getRepository('fibeContentBundle:Paper')
          ->findOneBy(array('title' => $current['setTitle'], 'conference' => $this->conference->getId()));
        if ($existsTest != null)
        {
          array_push($this->proceedingEntities, $existsTest);
          continue; //skip existing paper
        }
        $entity = new Paper();
        foreach ($current as $setter => $value)
        {
          if (is_array($value))
          {
            switch ($setter)
            {
              case 'addTopic':
                $entityArray = $this->topicEntities;
                break;
              case 'addAuthor':
                $entityArray = $this->personEntities;
                break;
              default:
                $entityArray = null;
                break;
            }
            $this->doArray($entityArray, $entity, $setter, $value);
          }
          else
          {
            call_user_func_array(array($entity, $setter), array($value));
          }
        }
        $entity->setMainEvent($this->conference);
        $em->persist($entity);
        array_push($this->proceedingEntities, $entity);
      }
      $proceedings = null;
    }


    //////////////////////  categories  //////////////////////
    if (isset($JSONFile['categories']))
    {
      $entities = $JSONFile['categories'];
      for ($i = 0; $i < count($entities); $i++)
      {
        $current = $entities[$i];
        $catSlug = StringTools::slugify($current['setName']);

        $existsTest = $this->getDoctrine()
          ->getRepository('fibeEventBundle:Category')
          ->findOneBy(array('slug' => $catSlug));
        if ($existsTest != null)
        {
          array_push($this->categoryEntities, $existsTest);
          continue; //skip existing category
        }

        $entity = new Category();
        foreach ($current as $setter => $value)
        {

          call_user_func_array(array($entity, $setter), array($value));
        }
        $entity->setMainEvent($this->conference);
        $em->persist($entity);
        array_push($this->categoryEntities, $entity);

      }
      $entities = null;
    }


    ////////////////////// mainEvent //////////////////////
    if (isset($JSONFile['conference']))
    {

      $this->conferenceData = $JSONFile['conference'];
      $this->doEvent($mainEvent, $this->conferenceData, true);
      $em->persist($mainEvent);
    }


    //retrieve Chair roletype
    $chairRoleType = $this->getDoctrine()
      ->getRepository('fibeContentBundle:RoleType')
      ->findOneBy(array('name' => 'Chair'));
    //retrieve Presenter roletype
    $presenterRoleType = $this->getDoctrine()
      ->getRepository('fibeContentBundle:RoleType')
      ->findOneBy(array('name' => 'Presenter'));


    //////////////////////  events  //////////////////////
    if (isset($JSONFile['events']))
    {
      $entities = $JSONFile['events'];
      for ($i = 0; $i < count($entities); $i++)
      {
        $entity = new \fibe\EventBundle\Entity\Event();
        $current = $entities[$i];
        $isMainConfEvent = false;
        if (isset($current["mainConferenceEvent"]))
        {
          $isMainConfEvent = true;
          // echo "mainEvent FOUND";
          // var_dump($current);
          // echo "\n";
          $entity = $mainEvent;
          // $this->conference->setMainConfEvent($entity);
          // $entity->setIsMainConfEvent(true);
          // $em->remove($mainEvent);
          // $mainEvent = $entity;
        }
        $this->doEvent($entity, $current, $isMainConfEvent);
        $em->persist($mainEvent);
      }

      //parent / child relationship
      for ($i = 0; $i < count($entities); $i++)
      {
        $entity = $this->eventEntities[$i];
        $current = $entities[$i];
        $hasParent = false;
        foreach ($current as $setter => $value)
        {
          if ($setter == "setParent" && isset($this->eventEntities[$value]))
          {
            $hasParent = true;
            $value = $this->eventEntities[$value];
            call_user_func_array(array($entity, $setter), array($value));
          }
        }
        if (!$hasParent)
        {
          $entity->setParent($mainEvent);
        }
        $entity->setMainEvent($this->conference);
        $em->persist($entity);
      }
      $entities = null;
    }

    //echo implode(",\t",$this->eventEntities)  ;
    //////////////////////  x prop  //////////////////////
    //echo "xproperties->\n";
    // if(isset($JSONFile['xproperties'])){
    //     $xproperties = $JSONFile['xproperties'];
    //     for($i=0;$i<count($xproperties);$i++){
    //         $current = $xproperties[$i];
    //         $entity= new XProperty();
    //         foreach ($current as $setter => $value) {
    //             if($setter=="setCalendarEntity"){

    //                 //echo "XProperty->->".$this->eventEntities[strval($value)]."->".$value.");\n";
    //                 $value=$this->eventEntities[$value];
    //             }
    //             //echo "XProperty->".$setter."(".$value.");\n";
    //             call_user_func_array(array($entity, $setter), array($value));
    //         }
    //         if(!$entity->getXKey())$entity->setXKey(rand (0,9999999999));
    //         $em->persist($entity);
    //     }
    // }

    $mainEvent->setParent(null);
    $em->persist($mainEvent);
    $em->persist($this->conference);

    //finally, make sure every events are at least child of the main conf event

    $confEvents = $this->conference->getEvents();
    foreach ($confEvents as $event)
    {
      if (!$event->getParent())
      {
        $event->setParent($mainEvent);
        $em->persist($event);
      }
    }
    $mainEvent->setParent(null);
    $em->persist($mainEvent);

    $em->flush();

    return new Response("ok");
  }

  private function doEvent($entity, $data, $isMainConfEvent)
  {
    foreach ($data as $setter => $value)
    {
      if ($setter == "setStartAt" || $setter == "setEndAt")
      {
        $date = explode(' ', $value);
        $value = new \DateTime($date[0], new \DateTimeZone(date_default_timezone_get()));
      }
      if ($setter == "setLocation")
      {
        $value = $this->locationEntities[$value];
      }

      if ($setter == "addCategorie")
      {
        if (count($this->categoryEntities) <= $value)
        {
          // echo count($this->categoryEntities)." ".$value." ".$entity->getLabel()."<br/>";
          $value = $this->defaultCategory;
        }
        else
        {
          $value = $this->categoryEntities[$value];
        }
      }

      if ($setter == "addPaper")
      {
        $j = 0;
        foreach ($value as $paper)
        {
          if ($j != 0)
          {
            $val = $this->proceedingEntities[$paper];

            call_user_func_array(array($entity, $setter), array($val));
          }
          $j++;
        }
        $value = $this->proceedingEntities[$value[0]];
      }

      if ($setter == "setParent")
      {
        continue;
      }

      // if($setter=="mainConferenceEvent"){

      //     // echo "mainEvent replaced";
      //     // $this->conference->setMainConfEvent($entity);
      //     // $entity->setIsMainConfEvent(true);
      //     // $this->conference->removeEvent($mainEvent);
      //     // $em->remove($mainEvent);
      //     // $mainEvent = $entity;
      //     continue;
      // }


      if (is_array($value))
      {
        switch ($setter)
        {
          case 'addTopic':
            $entityArray = $this->topicEntities;
            break;
          case 'addPaper':
            $entityArray = $this->proceedingEntities;
            break;
          default:
            $entityArray = null;
            break;
        }
        if ($setter == "addChair")
        {
          $setter = "addRole";
          foreach ($value as $chair)
          {
            $val = new Role();
            $val->setType($chairRoleType);
            $val->setPerson($this->personEntities[$chair]);
            $val->setEvent($entity);
            $val->setMainEvent($this->getUser()->getCurrentMainEvent());
            $entity->addRole($val);

          }
        }
        else if ($setter == "addPresenter")
        {
          $setter = "addRole";
          foreach ($value as $presenter)
          {
            $val = new Role();
            $val->setType($presenterRoleType);
            $val->setPerson($this->personEntities[$presenter]);
            $val->setEvent($entity);
            $val->setMainEvent($this->getUser()->getCurrentMainEvent());
            $entity->addRole($val);
          }
        }
        else
        {
          $this->doArray($entityArray, $entity, $setter, $value);
        }
      }
      else
      {
        call_user_func_array(array($entity, $setter), array($value));
      }
    }

    // if($isMainConfEvent){
    //      echo $entity->getLabel();
    //      echo date_format($entity->getStartAt(), 'Y-m-d H:i:s');
    // }

    $entity->setMainEvent($this->conference);
    array_push($this->eventEntities, $entity);
  }

  private function doArray($entityArray, $entity, $setter, $valArray)
  {
    foreach ($valArray as $e)
    {

      $val = $entityArray[$e];
      call_user_func_array(array($entity, $setter), array($val));
    }
  }
}
