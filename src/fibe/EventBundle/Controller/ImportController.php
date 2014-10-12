<?php

namespace fibe\EventBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Importer controller.
 * @Route("/importer")
 */
class ImportController extends Controller
{

  /**
   * Importer access.
   *
   * @Route("/", name="externalization_import_index")
   * @Template()
   */
  public function indexAction()
  {
    //check right
    $conference = $this->get('fibe_security.acl_entity_helper')->getEntityACL('OPERATOR', 'MainEvent', $this->getUser()->getCurrentMainEvent());

    return array();
  }
}
