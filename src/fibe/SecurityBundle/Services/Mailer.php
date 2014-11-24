<?php

  namespace fibe\SecurityBundle\Services;
   
  use Symfony\Component\Routing\RouterInterface;
  use FOS\UserBundle\Model\UserInterface;
  use FOS\UserBundle\Mailer\MailerInterface; 
  use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

  /**
   * @author Benoit ddlp @see FOS\UserBundle\Mailer\Mailer.php
   */
  class Mailer
  {
    protected $mailer;
    protected $router;
    protected $parameters;

    public function __construct($mailer, RouterInterface $router, array $parameters)
    {
      $this->mailer = $mailer;
      $this->router = $router;
      $this->parameters = $parameters;
    }

    public function sendRandomPwdEmailMessage(UserInterface $user,$serviceName)
    {
      $subject = "Sympozer";
      $subject  = $this->parameters['random_pwd_email_message']['subject'];
      $htmlBody = str_replace("#password#", $user->getPlainPassword(), 
                      str_replace("#serviceName#", $serviceName, 
                          $this->parameters['random_pwd_email_message']['html_body'] 
                  ));
      $textBody = str_replace("#password#", $user->getPlainPassword(), 
                      str_replace("#serviceName#", $serviceName, 
                          $this->parameters['random_pwd_email_message']['text_body'] 
                  ));
      $fromEmail = str_replace("#password#", $user->getPlainPassword(), 
                      str_replace("#serviceName#", $serviceName, 
                          $this->parameters['random_pwd_email_message']['from_email'] 
                  ));
      $this->sendEmailMessage($subject,$fromEmail, $user->getEmail(),$textBody, $htmlBody);
    }


    /**
     * @param        $subject
     * @param string $fromEmail
     * @param string $toEmail
     * @param        $textBody
     * @param bool   $htmlBody
     *
     * @internal param string $templateName
     * @internal param array $context
     */
    protected function sendEmailMessage($subject,$fromEmail, $toEmail, $textBody, $htmlBody = false)
    { 

      $message = \Swift_Message::newInstance()
          ->setSubject($subject)
          ->setFrom($fromEmail)
          ->setTo($toEmail);

      if (!empty($htmlBody))
      {
          $message->setBody($htmlBody, 'text/html')
              ->addPart($textBody, 'text/plain');
      } else
      {
          $message->setBody($textBody);
      }

      $this->mailer->send($message);
    }
  } 