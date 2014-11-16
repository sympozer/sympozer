<?php
namespace fibe\CommunityBundle\Services;

use FOS\UserBundle\Mailer\TwigSwiftMailer;
use FOS\UserBundle\Model\UserInterface;

/**
 *
 * @author benoitddlp
 */
class MailManager extends TwigSwiftMailer
{

  protected $frontEndPath;

  protected $confirmPath;

  public function sendConfirmationEmailMessage(UserInterface $user)
  {
    $template = $this->parameters['template']['confirmation'];

//    $url = $this->router->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), true);

    //generate an url like :
    //   http://localhost/sympozer/sympozer-front/app/#/confirm?token=JUqCFLxukPIDtFlXLufka5YxOtZoX1a8TtgNa41Jvy0
    $url = $this->frontEndPath . $this->confirmPath . "/" . $user->getConfirmationToken();

    $context = array(
      'user' => $user,
      'confirmationUrl' => $url
    );

    $this->sendMessage($template, $context, $this->parameters['from_email']['confirmation'], $user->getEmail());
  }

  public function sendConfirmationTokenNoMoreValidEmailMessage(UserInterface $user)
  {
    //TODO
//      $template = $this->parameters['template']['confirmation'];
//      $url = $this->router->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), true);
//      $context = array(
//        'user' => $user,
//        'confirmationUrl' => $url
//      );
//
//      $this->sendMessage($template, $context, $this->parameters['from_email']['confirmation'], $user->getEmail());
  }
  public function sendInvitationEmailMessage(UserInterface $user)
  {
    //TODO
//      $template = $this->parameters['template']['confirmation'];
//      $url = $this->router->generate('fos_user_registration_confirm', array('token' => $user->getConfirmationToken()), true);
//      $context = array(
//        'user' => $user,
//        'confirmationUrl' => $url
//      );
//
//      $this->sendMessage($template, $context, $this->parameters['from_email']['confirmation'], $user->getEmail());
  }

  /**
   * @param mixed $frontEndPath
   */
  public function setFrontEndPath($frontEndPath)
  {
    $this->frontEndPath = $frontEndPath;
  }

  /**
   * @param mixed $confirmPath
   */
  public function setConfirmPath($confirmPath)
  {
    $this->confirmPath = $confirmPath;
  }
}