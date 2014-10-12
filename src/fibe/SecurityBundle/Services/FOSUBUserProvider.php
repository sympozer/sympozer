<?php
namespace fibe\SecurityBundle\Services;
 
use fibe\SecurityBundle\Entity\User;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider as BaseFOSUBUserProvider;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\User\UserInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use Doctrine\ORM\ORMException;

/**
 *  Social media user provider @see https://gist.github.com/danvbe/4476697#file-fosubuserprovider-php
 */
class FOSUBUserProvider extends BaseFOSUBUserProvider
{

    protected $session;
    protected $mailer;
    protected $userService;


  /**
   * Constructor.
   *
   * @param UserManagerInterface $userManager FOSUB user provider.
   * @param array $properties Property mapping.
   * @param \Symfony\Component\HttpFoundation\Session\Session $session
   * @param $mailer
   */
    public function __construct(UserManagerInterface $userManager, array $properties, Session $session,$mailer,UserService $userService)
    {
      parent::__construct($userManager, $properties); 
      $this->session = $session;
      $this->mailer = $mailer;
      $this->userService = $userService;
    }
 
    /**
     * {@inheritdoc}
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
      $socialServiceId = $response->getUsername();
      $socialServiceUser = $this->userManager->findUserBy(array($this->getProperty($response) => $socialServiceId));
      $loggedUser = $this->userManager->findUserBy(array('id' => $this->session->get("userId")));
      $this->session->remove("userId");
      $serviceName = $response->getResourceOwner()->getName();

      if (null === $socialServiceUser)
      { //social service user not found
        if($loggedUser instanceof UserInterface)
        { //first account  
          $setter = 'set' . ucfirst($serviceName) . 'Id';
          $loggedUser->$setter($socialServiceId);
          return $this->enrich($loggedUser,$serviceName,$response);  
        }
        else
        { //no user with this social service Id and not logged
          // => creating a new user 
          return $this->create($serviceName,$response,$socialServiceId);
        } 
      }
      else 
      { //social service user found
        if($loggedUser instanceof UserInterface)
        { //social service already registered by current user 
          if($socialServiceUser->getId() === $loggedUser->getId())
          { //enrich account on demand
            return $this->enrich($loggedUser,$serviceName,$response);
          }else
          { //social service already registered for another user
            $this->session->getFlashBag()->add('warning', 'This '.ucfirst($serviceName).' account is already registered for another account.');
            return $loggedUser;
          } 
        }
        else
        { //just login     
          return $this->login($socialServiceUser,$serviceName,$response); 
        } 
      }
    } 
    //just login 
    private function login(UserInterface $user,$serviceName,UserResponseInterface $response)
    {
      $setter = 'set' . ucfirst($serviceName) . 'AccessToken';
      $user->$setter($response->getAccessToken());
      $this->session->getFlashBag()->add('success', 'Welcome back!');
      return $user; 
    } 

    //enrich account on demand
    private function enrich(UserInterface $user,$serviceName,UserResponseInterface $response)
    { 
      $setter = 'set' . ucfirst($serviceName) . 'AccessToken';
      $user->$setter($response->getAccessToken());
      $this->enrichUserDatas($user,$serviceName,$response);
      $this->session->getFlashBag()->add('success', 'account enriched.');
      return $user; 
    } 

  /**
   *  No user with this social service Id and not logged
   *  try to get the existing email user
   *      if none found create a new user with userName = email && random password
   *
   * @param $serviceName
   * @param UserResponseInterface $response
   * @param $socialServiceId
   * @return User
   * @throws \Doctrine\ORM\ORMException
   */
  private function create($serviceName,UserResponseInterface $response,$socialServiceId)
    {

      // check no-mail
      $mail = $response->getEmail();
      if(empty($mail))
        throw new ORMException("Couldn't have got an email address from ".$serviceName);
      /** @var User $user */
      $user = $this->userManager->findUserByEmail($mail);
      $newUser = false;
      if(! $user instanceof UserInterface)
      {
        $newUser =true;
        $user = $this->userManager->createUser();
      }

      $setter = 'set'.ucfirst($serviceName);
      $setter_id = $setter.'Id';
      $setter_token = $setter.'AccessToken';
      $user->$setter_id($socialServiceId);
      $user->$setter_token($response->getAccessToken());


      if($newUser)
      {
        $user->setUsername($mail);
        $user->setEmail($mail);
        $user->setPlainPassword(substr(base_convert(bin2hex(hash('sha256', uniqid(mt_rand(), true), true)), 16, 36), 0, 12));
        $user->setRandomPwd(true);
        $user->setEnabled(true);
      }

      $this->userService->post($user);
      $this->enrichUserDatas($user,$serviceName,$response);
      $this->userManager->updateUser($user);
      $this->mailer->sendRandomPwdEmailMessage($user,$serviceName);


      return $user;
    } 

    private function enrichUserDatas(User $user,$serviceName,UserResponseInterface $response)
    {
      $mail = $response->getEmail();
      if(!empty($mail))
          $user->setEmail($mail);

      $realName = $response->getRealName();
      if(!empty($realName))
          $user->setName($realName);

      $profilePicture = $response->getProfilePicture();
      if(!empty($profilePicture))
          $user->setPicture($profilePicture);

      if($serviceName == "twitter"){
        $user->setTwitterScreenName($response->getNickName());
      }
      $this->userService->put($user);
    }


    /**
     * actually, don't when this function is called...
     * {@inheritDoc}
     */
    public function connect(UserInterface $user, UserResponseInterface $response)
    {
      throw new \Exception('FOSUBUserProvider:connect()');
      $property = $this->getProperty($response);
      $username = $response->getUsername();

      //on connect - get the access token and the user ID
      $serviceName = $response->getResourceOwner()->getName();

      $setter = 'set'.ucfirst($serviceName);
      $setter_id = $setter.'Id';
      $setter_token = $setter.'AccessToken';

      //we "disconnect" previously connected users
      if (null !== $previousUser = $this->userManager->findUserBy(array($property => $username))) {
        $previousUser->$setter_id(null);
        $previousUser->$setter_token(null);
        $this->userManager->updateUser($previousUser);
      }

      //we connect current user
      $user->$setter_id($username);
      $user->$setter_token($response->getAccessToken());

      $this->userManager->updateUser($user);
    }

    /*
      // login with the HWIOAuth way 
      $socialServiceUser = parent::loadUserByOAuthUserResponse($response);

      //update access token
      $serviceName = $response->getResourceOwner()->getName();
      $setter = 'set' . ucfirst($serviceName) . 'AccessToken'; 
      $socialServiceUser->$setter($response->getAccessToken());
    */
}