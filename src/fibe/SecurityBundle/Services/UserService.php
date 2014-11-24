<?php
namespace fibe\SecurityBundle\Services;

use fibe\CommunityBundle\Entity\Person;
use fibe\RestBundle\Services\AbstractBusinessService;
use fibe\SecurityBundle\Entity\User;

/**
 *
 * @author benoitddlp
 */
class UserService extends AbstractBusinessService
{

  public function post(User $user)
  {
    $person = new Person();
    $person->setUser($user);
    $person->setFirstName($user->getEmail());
    $person->setEmail($user->getEmail());
    $this->entityManager->persist($person);
    return $user;
  }

  public function put(User $user)
  {
    $person = $user->getPerson();
    $person->setEmail($user->getEmail());

    $realName = $user->getName();
    if (!empty($realName))
    {
      $nameArray = preg_split('/\s+/', $realName);
      $person->setFirstName($nameArray[0]);
      $person->setFamilyName(implode(array_slice($nameArray, 1), " "));
    }

    $profilePicture = $user->getPicture();
    if (!empty($profilePicture))
    {
      $person->setImg($profilePicture);
    }

    $this->entityManager->persist($person);
  }
}

