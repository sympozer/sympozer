<?php

namespace fibe\SecurityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * plain old object used as dto for user permissions about the current conference
 */
class ConfPermission
{

  protected $action;

  protected $entity;

  public function getAction()
  {
    return $this->action;
  }

  public function setAction($action)
  {
    $this->action = $action;

    return $this;
  }

  /**
   * @return mixed
   */
  public function getEntity()
  {
    return $this->entity;
  }

  /**
   * @param mixed $entity
   */
  public function setEntity($entity)
  {
    $this->entity = $entity;
  }
}