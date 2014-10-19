<?php
/**
 * Created by IntelliJ IDEA.
 * User: vinz
 * Date: 02/08/14
 * Time: 19:52
 */

namespace fibe\AdminBundle\Admin;

use fibe\AdminBundle\AdminUtils\AdminSympozerInherit;
use fibe\AdminBundle\AdminUtils\EntityUtils;
use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;

class OnlyListAdmin extends GenericAdmin
{
  /**
   * For VEvent or additional information
   *
   * we cannot instanciate a new VEvent
   * (But we can see his fields)
   *
   * @param RouteCollection $collection
   */
  protected function configureRoutes(RouteCollection $collection)
  {
    $collection->clearExcept(array('list', 'edit'));
  }
}