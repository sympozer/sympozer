<?php

namespace fibe\DocumentationBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;


/**
 * Documentation controller.
 * @Route("/documentation")
 */
class DocumentationController extends Controller
{
  /**
   * @Route("/{anchor}", name="documentation")
   * @Template()
   */
  public function documentationAction($anchor)
  {


    $this->redirect($this->generateUrl('documentation', array('anchor' => $anchor)) . '#' . $anchor);

    /*return $this->render('DocumentationBundle:Documentation:documentation.html.twig', array(
        'anchor' => $anchor,
    ));*/

  }

}
