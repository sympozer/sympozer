<?php

namespace fibe\FrontendBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class FrontController extends Controller
{
  /**
   * @Route("/", name="fibe_frontend_front_index")
   * @Template()
   */
  public function indexAction(Request $request)
  {
    $session = $request->getSession();
    $shouldLogin = $session->get("shouldLogin");
    $session->remove("shouldLogin");
    return array(
      'user' => $this->get('jms_serializer')->serialize($this->getUser(), 'json'),
      'shouldLogin' => $shouldLogin
    );
  }

  /**
   * @Route("/login", name="fibe_frontend_front_login")
   */
  public function loginAction(Request $request)
  {
    $session = $request->getSession();
    $session->set("shouldLogin", "true");
    return $this->redirect($this->generateUrl('fibe_frontend_front_index'));
  }
}
