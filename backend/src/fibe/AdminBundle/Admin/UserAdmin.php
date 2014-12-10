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

class UserAdmin extends GenericAdmin
{
  /**
   * For User, don't recognize the defintion of socials accounts
   *
   * @param FormMapper $formMapper
   */
  protected function configureFormFields(FormMapper $formMapper)
  {
    $eventVars = $this->getAllFields();
    foreach ($eventVars as $eventVar)
    {
      // If it's a social account, we define it as a string
      if (in_array($eventVar, $this->getArrayOfSocialsAccounts()))
      {
        $formMapper->add($eventVar, 'text', array('required' => false));
      }
      else
      {
        $formMapper->add($eventVar);
      }
    }
  }

  /**
   * Because there is too many values about the user,
   * we choose to not show the socials accounts
   * and the password
   *
   * @param ListMapper $listMapper
   */
  protected function configureListFields(ListMapper $listMapper)
  {
    $listMapper
      ->addIdentifier('id')
    ;
    $eventVars = $this->getAllFields();
    foreach ($eventVars as $eventVar)
    {
      // If it's not a social account value
      if (!in_array($eventVar, $this->getArrayOfSocialsAccounts()) && $eventVar !== 'password')
      {
        $listMapper->add($eventVar);
      }
    }
  }

  /**
   * We need to add more filters options for a user
   *
   * @param DatagridMapper $datagridMapper
   */
  protected function configureDatagridFilters(DatagridMapper $datagridMapper)
  {
    parent::configureDatagridFilters($datagridMapper);
    if (in_array('name', $this->getAllFields()))
    {
      $datagridMapper->add('name');
    }
    if (in_array('username', $this->getAllFields()))
    {
      $datagridMapper->add('username');
    }
    if (in_array('email', $this->getAllFields()))
    {
      $datagridMapper->add('email');
    }
  }

  /**
   * Return an array containing the identifiers of social accounts
   * of the User entity
   *
   * @return array
   */
  private function getArrayOfSocialsAccounts()
  {
    return [
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
    ];
  }
}