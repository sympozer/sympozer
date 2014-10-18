<?php
/**
 * Created by IntelliJ IDEA.
 * User: vinz
 * Date: 03/08/14
 * Time: 11:40
 */

namespace fibe\AdminBundle\AdminUtils;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;

/**
 * Class AdminSympozerInherit
 *
 * Class with common functions between Admin entities in Sympozer
 *
 * @package fibe\AdminBundle\AdminUtils
 */
abstract class AdminSympozerInherit extends Admin {

  protected $excluded;

  /**
   * @return mixed
   */
  protected function getExcluded()
  {
    if ($this->excluded == null)
    {
      $this->setExcluded();
    }
    return $this->excluded;
  }

  /**
   * Set the fields to exclude (on create and update)
   */
  abstract function setExcluded();

  // Fields to be shown on create/edit forms
  protected function configureFormFields(FormMapper $formMapper)
  {
    $eventVars = $this->getAllFields();
    foreach ($eventVars as $eventVar)
    {
      $formMapper->add($eventVar);
    }
  }

  // Fields to be shown on filter forms
  protected function configureDatagridFilters(DatagridMapper $datagridMapper)
  {
    $datagridMapper->add('id');
    if (in_array('label', $this->getAllFields()))
    {
      $datagridMapper->add('label');
    }
  }

  // Fields to be shown on lists
  protected function configureListFields(ListMapper $listMapper)
  {
    $listMapper
      ->addIdentifier('id')
    ;
    $eventVars = $this->getAllFields();
    foreach ($eventVars as $eventVar)
    {
      $listMapper->add($eventVar);
    }
  }

  /**
   * Return all fields (with excluded)
   *
   * @param bool $withExcluded with or without excluded fields
   *
   * @return array
   */
  protected function getAllFields($withExcluded = true)
  {
    return EntityUtils::getAllVarsFromEntity($this->getEntityName(), ($withExcluded) ? $this->getExcluded() : array());
  }

  /**
   * Return the name of the entity
   *
   * @return mixed
   */
  abstract function getEntityName();

} 