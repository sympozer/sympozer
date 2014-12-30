<?php
namespace fibe\SecurityBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use HWI\Bundle\OAuthBundle\Controller\ConnectController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

/**
 *
 * @author benoitddlp
 */
class SocialConnectRESTController extends ConnectController
{
    /**
     *
     * @Route("/login/service/{service}", name="hwi_oauth_connect_service")
     *
     * @param Request $request
     * @param $service
     *
     * @throws AccessDeniedException
     * @throws NotFoundHttpException
     * @return \fibe\SecurityBundle\Entity\User
     */
    public function connectServiceAction(Request $request, $service)
    {
        $connect = $this->container->getParameter('hwi_oauth.connect');
        if (!$connect)
        {
            throw new NotFoundHttpException();
        }

        $hasUser = $this->container->get('security.context')->isGranted('IS_AUTHENTICATED_REMEMBERED');
        if (!$hasUser)
        {
            throw new AccessDeniedException('Cannot connect an account.');
        }

        // Get the data from the resource owner
        $resourceOwner = $this->getResourceOwnerByName($service);

        $session = $request->getSession();
        $key = $request->query->get('key', time());

        if ($resourceOwner->handles($request))
        {
            $accessToken = $resourceOwner->getAccessToken(
                $request,
                $this->container->get('hwi_oauth.security.oauth_utils')->getServiceAuthUrl($request, $resourceOwner)
            );

            // save in session
            $session->set('_hwi_oauth.connect_confirmation.' . $key, $accessToken);
        }
        else
        {
            $accessToken = $session->get('_hwi_oauth.connect_confirmation.' . $key);
        }

        $userInformation = $resourceOwner->getUserInformation($accessToken);
        /** @var \fibe\SecurityBundle\Entity\User $user */
        $user = $this->container->get('hwi_oauth.account.connector')->loadUserByOAuthUserResponse($userInformation);
        $this->authenticateUser($request, $user, $service, $accessToken);
        return new RedirectResponse(sprintf("%s?username=%s&id=%s",

            $this->container->getParameter('front_end_path'),
            $user->getUsername(),
            $user->getId()
        ));
    }
}