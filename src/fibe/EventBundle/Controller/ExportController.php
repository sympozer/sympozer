<?php

namespace fibe\EventBundle\Controller;

use Doctrine\Common\Collections\ArrayCollection;
use IDCI\Bundle\ExporterBundle\Export\ExportFactory;
use IDCI\Bundle\ExporterBundle\Service\Manager;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Exporter controller.
 * @Route("/exporter")
 */
class ExportController extends Controller
{

  /**
   * Exporter index.
   *
   * @Route("/", name="externalization_export_index")
   * @Template()
   */
  public function indexAction()
  {
    $wwwConf = $this->getUser()->getCurrentMainEvent();
    $this->get('fibe_security.acl_entity_helper')->checkEntityACL('VIEW', 'MainEvent', $wwwConf);

    $export_form = $this->createFormBuilder()
      ->add(
        'export_format',
        'choice',
        array(
          'choices' => array('xml' => 'SWC', 'csv' => 'CSV'),
          'required' => true,
        )
      )
      ->getForm();

    //Authorization Verification conference datas manager
    $user = $this->getUser();

    return array(
      'wwwConf' => $wwwConf,
      'export_form' => $export_form->createView()
    );
  }


  /**
   * Exporter process.
   *
   * @Route("/process", name="externalization_export_process")
   *
   *
   */
  public function processAction(Request $request)
  {
    $this->get('fibe_security.acl_entity_helper')->checkEntityACL('VIEW', 'MainEvent');
    $export_form = $this->createFormBuilder()
      ->add(
        'export_format',
        'choice',
        array(
          'choices' => array('xml' => 'SWC', 'csv' => 'CSV'),
          'required' => true,
        )
      )
      ->getForm();
    $export_form->bind($request);

    if ($export_form->isValid())
    {
      $format = $export_form["export_format"]->getData();

      $conference = $this->getUser()->getCurrentMainEvent();
      $conferenceArr = new ArrayCollection();
      $conferenceArr->add($conference);

      $exportManager = $this->get('idci_exporter.manager');
      if ("xml" == $format)
      {
        //override export function to override buildHeader / Footer in order to remove the <entities> wrapper tag
        $export = ExportFactory::getInstance(
          $format,
          array()
        );
        $export->setContent('<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL);
        $transformer = $exportManager->guessTransformer($conference, $format);
        $export->addContent($transformer->transform($conference, $format));
      }
      else
      {
        $export = $exportManager->export($conferenceArr, $format);
      }
      //override export function to override buildHeader / Footer
      $filename = $conference->getConfName() . "." . $format;

      $response = new Response($export->getContent());
      $response->headers->set('Content-Type', 'text/' . $format);
      $response->headers->set('Content-Disposition', 'attachment;filename=' . $filename);

      return $response;
    }

    return $this->redirect($this->generateUrl('externalization_export_index'));

  }

  function cleanParams($params)
  {
    $clean = array();
    foreach ($params as $k => $v)
    {
      if ($v != '')
      {
        $clean[$k] = $v;
      }
    }

    return $clean;
  }
}
