<?php

namespace fibe\RestBundle\Tests\Fixtures;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use fibe\ContentBundle\Entity\Location;


class LocalizationFixture extends AbstractFixture implements FixtureInterface
{
  static public $entities = array();

  static public function create()
  {
    return new Location();
  }

  public function load(ObjectManager $manager)
  {
    for ($i = 0; $i < 10; $i++)
    {
      $entity = new Location();
      $entity->setLabel('label' . $i);
      $manager->persist($entity);
      self::$entities[] = $entity;
    }

    $manager->flush();

  }
}
