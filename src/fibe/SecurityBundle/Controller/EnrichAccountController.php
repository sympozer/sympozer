<?php

namespace fibe\SecurityBundle\Controller;

use FOS\UserBundle\Model\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 * Override edit and show action of FOS\UserBundle\Controller\ProfileController
 */
class EnrichAccountController extends Controller
{


  /**
   * set user Id in the session so we can get it back next to his social account loggin
   * @Route("/enrich/{socialService}", name="enrich_account")
   */
  public function enrichAccountAction($socialService)
  {
    $session = $this->get('session');
    /** @var  $user */
    $user = $this->getUser();
    if (!is_object($user) || !$user instanceof UserInterface)
    {
      throw new AccessDeniedException('This user does not have access to this section.');
    }
    $session->set('userId', $user->getId());
    $oAuthHelper = $this->get('hwi_oauth.templating.helper.oauth');
    return new RedirectResponse($oAuthHelper->getLoginUrl($socialService));
  }
}
