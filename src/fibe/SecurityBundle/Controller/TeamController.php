<?php

namespace fibe\SecurityBundle\Controller;

use Symfony\Component\DomCrawler\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use fibe\SecurityBundle\Entity\User;
use fibe\SecurityBundle\Entity\UserConfPermission;
use fibe\SecurityBundle\Form\UserAuthorizationType;
use fibe\SecurityBundle\Form\UserConfPermissionType;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Pagerfanta\Adapter\ArrayAdapter;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Exception\NotValidCurrentPageException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * User controller.
 *
 * @Route("/team")
 */
class TeamController extends Controller
{
  /**
   * @Route("/", name="conference_team_index")
   * @Method("GET")
   * @Template()
   */
  public function indexAction()
  {

    $currentMainEvent = $this->getUser()->getcurrentMainEvent();

    $ACLService = $this->get('fibe_security.acl_user_permission_helper');
    //here the access control is on the team and not on the teamate himself
    $team = $ACLService->getEntityACL('VIEW', 'Team', $currentMainEvent->getTeam());

    $managers = $team->getTeammates();

    $delete_forms = array();
    $managerConfAuthorizations = array();

    foreach ($managers
             as
             $manager)
    {
      if ($manager->getId() != $this->getUser()->getId())
      {

        $delete_forms[] = $this->createDeleteForm($manager->getId())->createView();

        $managerConfAuthorizations[] = $ACLService->getUserConfPermission($manager, false);
      }
    }

    $userConfPermission = $ACLService->getUserConfPermission($this->getUser(), false);
    $addTeamateForm = $this->createForm(
      new UserConfPermissionType($this->getUser()),
      $ACLService->getUserConfPermission()
    );

    return array(
      'team'                                => $team,
      'delete_forms'                        => $delete_forms,
      'manager_conf_authorizations'         => $managerConfAuthorizations,
      'current_manager_conf_authorizations' => $userConfPermission,
      // 'update_forms'                     => $update_forms,
      'add_teamate_form'                    => $addTeamateForm->createView(),
      'currentMainEvent'                         => $currentMainEvent,
      'authorized'                          => true
    );
  }

  /**
   * add teamate with his UserConfPermission
   *
   * @Route("/add", name="conference_team_add")
   *
   */
  public function addTeamateAction(Request $request)
  {

    $currentMainEvent = $this->getUser()->getcurrentMainEvent();
    $ACLService = $this->get('fibe_security.acl_user_permission_helper');
    $team = $ACLService->getEntityACL('CREATE', 'Team', $currentMainEvent->getTeam()->getId());

    $userConfPermission = $ACLService->getUserConfPermission();
    $form = $this->createForm(new UserConfPermissionType($this->getUser()), $userConfPermission);
    $form->bind($request);

    if ($form->isValid())
    {
      $em = $this->getDoctrine()->getManager();
      $teamate = $userConfPermission->getUser();
      $team->addTeammate($teamate);
      $teamate->addTeam($team);
      $em->persist($teamate);
      $em->persist($team);
      $em->persist($currentMainEvent);

      $ACLService->updateUserConfPermission($userConfPermission);

      $em->flush();
      $this->container->get('session')->getFlashBag()->add(
        'success',
        $teamate->getUsername() . ' is now in your team!'
      );
    }
    else
    {
      $this->container->get('session')->getFlashBag()->add(
        'error',
        'there was an error adding ' . $teamate->getUsername() . ' to your team!'
      );
    }

    return $this->redirect($this->generateUrl('conference_team_index'));
  }


  /**
   * Displays a form to edit an existing authorization.
   * @Route("/{id}/edit", name="conference_team_edit")
   * @Template()
   */
  public function editAction($id)
  {
    $currentMainEvent = $this->getUser()->getCurrentMainEvent();
    $ACLService = $this->get('fibe_security.acl_user_permission_helper');
    $team = $ACLService->getEntityACL('VIEW', 'Team', $currentMainEvent->getTeam()->getId());

    $em = $this->getDoctrine()->getManager();
    $entity = $em->getRepository('fibeSecurityBundle:User')->find($id);

    $userConfPermission = $ACLService->getUserConfPermission($entity);
    $editForm = $this->createForm(new UserConfPermissionType($this->getUser()), $userConfPermission);

    return array(
      'entity'     => $entity,
      'edit_form'  => $editForm->createView(),
      'authorized' => true,
    );
  }

  /**
   * @Route("/{id}/update", name="conference_teamate_update")
   */
  public function updateAction(Request $request, $id)
  {
    $currentMainEvent = $this->getUser()->getCurrentMainEvent();
    $ACLService = $this->get('fibe_security.acl_user_permission_helper');
    $team = $ACLService->getEntityACL('VIEW', 'Team', $currentMainEvent->getTeam()->getId());

    $em = $this->getDoctrine()->getManager();
    $entity = $em->getRepository('fibeSecurityBundle:User')->find($id);

    $userConfPermission = $ACLService->getUserConfPermission($entity);
    $editForm = $this->createForm(new UserConfPermissionType($this->getUser()), $userConfPermission);
    $editForm->bind($request);

    if ($editForm->isValid())
    {
      $ACLService->updateUserConfPermission($userConfPermission);

      $em->persist($entity);
      $em->flush();
      $this->container->get('session')->getFlashBag()->add(
        'success',
        $entity->getUsername() . '\'s right have been successfully updated!'
      );

      return $this->redirect($this->generateUrl('conference_team_index'));
    }

    return $this->redirect($this->generateUrl('conference_team_edit', array('id' => $id)));
  }


  /**
   * Deletes a teamate entity.
   *
   * @Route("/{id}", name="conference_team_delete")
   * @Method("DELETE")
   */
  public function deleteAction(Request $request, $id)
  {
    $form = $this->createDeleteForm($id);
    $form->bind($request);

    $em = $this->getDoctrine()->getManager();

    if ($id == $this->getuser()->getId())
    {
      $this->container->get('session')->getFlashBag()->add(
        'error',
        'You cannot delete yourself !'
      );
    }
    else
    {
      if ($form->isValid())
      {
        $manager = $em->getRepository('fibeSecurityBundle:User')->find($id);
        //cannot delete owner
        $currentMainEvent = $this->getUser()->getcurrentMainEvent();
        $ACLService = $this->get('fibe_security.acl_user_permission_helper');
        $team = $ACLService->getEntityACL('DELETE', 'Team', $currentMainEvent->getTeam());
        if ("OWNER" == $ACLService->getACEByEntity($team, $manager))
        {
          throw new AccessDeniedHttpException("cannot remove the owner");
        }

        if (!$manager)
        {
          throw $this->createNotFoundException('Unable to find User entity.');
        }
        $team->removeTeammate($manager);
        $manager->removeTeam($team);
        $em->persist($team);
        $em->persist($manager);
        $em->flush();
        $this->container->get('session')->getFlashBag()->add(
          'success',
          'This teamate doesn\'t belong to the current conference anymore!'
        );
      }
    }

    return $this->redirect($this->generateUrl('conference_team_index'));
  }


  /**
   * Creates a form to delete a User entity by id.
   *
   * @param mixed $id The entity id
   *
   * @throws \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException
   * @return Form The form
   */
  private function createDeleteForm($id)
  {
    return $this->createFormBuilder(array('id' => $id))
      ->add('id', 'hidden')
      ->getForm();
  }
}