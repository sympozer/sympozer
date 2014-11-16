<?php

namespace fibe\SecurityBundle\Controller;

use fibe\SecurityBundle\Form\TeammateType;
use fibe\SecurityBundle\Form\UserAuthorizationType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\DomCrawler\Form;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * TODO: TO REMOVE
 * TODO: TO REMOVE
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
    //here the access control is on the team and not on the teammate himself
    $team = $ACLService->checkEntityACL('VIEW', 'Team', $currentMainEvent->getTeam());

    $managers = $team->getTeammates();

    $delete_forms = array();
    $managerConfAuthorizations = array();

    foreach ($managers as $manager)
    {
      if ($manager->getId() != $this->getUser()->getId())
      {

        $delete_forms[] = $this->createDeleteForm($manager->getId())->createView();

        $managerConfAuthorizations[] = $ACLService->getPermissionForTeammate($manager, false);
      }
    }

    $teammate = $ACLService->getPermissionForTeammate($this->getUser(), false);
    $addTeammateForm = $this->createForm(
      new TeammateType($this->getUser()),
      $ACLService->getPermissionForTeammate()
    );

    return array(
      'team' => $team,
      'delete_forms' => $delete_forms,
      'manager_conf_authorizations' => $managerConfAuthorizations,
      'current_manager_conf_authorizations' => $teammate,
      // 'update_forms'                     => $update_forms,
      'add_teammate_form' => $addTeammateForm->createView(),
      'currentMainEvent' => $currentMainEvent,
      'authorized' => true
    );
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

  /**
   * add teammate with his Teammate
   *
   * @Route("/add", name="conference_team_add")
   *
   */
  public function addTeammateAction(Request $request)
  {

    $currentMainEvent = $this->getUser()->getcurrentMainEvent();
    $ACLService = $this->get('fibe_security.acl_user_permission_helper');
    $team = $ACLService->checkEntityACL('CREATE', 'Team', $currentMainEvent->getTeam()->getId());

    $teammate = $ACLService->getPermissionForTeammate();
    $form = $this->createForm(new TeammateType($this->getUser()), $teammate);
    $form->bind($request);

    if ($form->isValid())
    {
      $em = $this->getDoctrine()->getManager();
      $teammate = $teammate->getPerson();
      $team->addTeammate($teammate);
      $teammate->addTeam($team);
      $em->persist($teammate);
      $em->persist($team);
      $em->persist($currentMainEvent);

      $ACLService->updateTeammate($teammate);

      $em->flush();
      $this->container->get('session')->getFlashBag()->add(
        'success',
        $teammate->getUsername() . ' is now in your team!'
      );
    }
    else
    {
      $this->container->get('session')->getFlashBag()->add(
        'error',
        'there was an error adding ' . $teammate->getUsername() . ' to your team!'
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
    $team = $ACLService->checkEntityACL('VIEW', 'Team', $currentMainEvent->getTeam()->getId());

    $em = $this->getDoctrine()->getManager();
    $entity = $em->getRepository('fibeSecurityBundle:User')->find($id);

    $teammate = $ACLService->getPermissionForTeammate($entity);
    $editForm = $this->createForm(new TeammateType($this->getUser()), $teammate);

    return array(
      'entity' => $entity,
      'edit_form' => $editForm->createView(),
      'authorized' => true,
    );
  }

  /**
   * @Route("/{id}/update", name="conference_teammate_update")
   */
  public function updateAction(Request $request, $id)
  {
    $currentMainEvent = $this->getUser()->getCurrentMainEvent();
    $ACLService = $this->get('fibe_security.acl_user_permission_helper');
    $team = $ACLService->checkEntityACL('VIEW', 'Team', $currentMainEvent->getTeam()->getId());

    $em = $this->getDoctrine()->getManager();
    $entity = $em->getRepository('fibeSecurityBundle:User')->find($id);

    $teammate = $ACLService->getPermissionForTeammate($entity);
    $editForm = $this->createForm(new TeammateType($this->getUser()), $teammate);
    $editForm->bind($request);

    if ($editForm->isValid())
    {
      $ACLService->updateTeammate($teammate);

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
   * Deletes a teammate entity.
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
        $team = $ACLService->checkEntityACL('DELETE', 'Team', $currentMainEvent->getTeam());
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
          'This teammate doesn\'t belong to the current conference anymore!'
        );
      }
    }

    return $this->redirect($this->generateUrl('conference_team_index'));
  }
}