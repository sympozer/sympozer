<?php

namespace fibe\RestBundle\Tests;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use fibe\ContentBundle\Entity\Location;


class LocationFixture extends AbstractFixture implements FixtureInterface
{
  static public $entities = array();

  public function load(ObjectManager $manager)
  {
    for($i = 0; $i < 10; $i++)
    {
      $entity = new Location();
      $entity->setLabel('label' . $i);
      $manager->persist($entity);
      self::$entities[] = $entity;
    }

    $entity = new Location();
    $entity->setLabel('label999-test-search'); // must be placed lexicographically at the end to pass sort test
    $manager->persist($entity);
    self::$entities[] = $entity;

    $manager->flush();

  }
}
