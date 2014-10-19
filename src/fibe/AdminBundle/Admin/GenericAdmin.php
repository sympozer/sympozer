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

class GenericAdmin extends AdminSympozerInherit
{
  /**
   * Return the name of the entity
   *
   * @return mixed
   */
  function getEntityName()
  {
    return $this->getClass();
  }

  /**
   * Set the fields to exclude (on create and update)
   */
  function setExcluded()
  {
    //@TODO : faire le typage logo
    $this->excluded = array(
      'id',
      'mainEvent',
      'person',
      'logo',
      //@TODO Fields with types not defined
      'googleId',
      'googleAccessToken',
      'twitterId',
      'twitterScreenName',
      'twitterAccessToken',
      'facebookId',
      'facebookAccessToken',
      'linkedinId',
      'linkedinAccessToken',
      'plainPassword'
    );
  }
}