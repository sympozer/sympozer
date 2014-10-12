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
}