<?php

namespace fibe\RestBundle\Handler;

use FOS\UserBundle\Model\UserManagerInterface;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Translation\TranslatorInterface;


class AuthenticationHandler implements AuthenticationSuccessHandlerInterface, AuthenticationFailureHandlerInterface
{

    protected $router;
    protected $security;
    protected $userManager;
    protected $translator;

    public function __construct(RouterInterface $router, SecurityContext $security, UserManagerInterface $userManager, TranslatorInterface $translator, SerializerInterface $jms_serializer)
    {
        $this->router = $router;
        $this->security = $security;
        $this->userManager = $userManager;
        $this->translator = $translator;
        $this->jms_serializer = $jms_serializer;
    }

    /**
     * if html asked :
     *  Redirect to the front end at :
     *    - the profile page in case the password hasn't been set yet
     *    - otherwise to the homepage
     * else:
     *  return the json user
     *
     * @param Request $request
     * @param TokenInterface $token
     * @return RedirectResponse|Response
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        /** @var \fibe\SecurityBundle\Entity\User $user */
        $user = $token->getUser();
        $user->setLastLogin(new \DateTime());
        $this->userManager->updateUser($user);
        if ('html' == $request->getRequestFormat())
        {
            $redirectUrl = $this->router->generate('fibe_frontend_front_index');
            if ($user->isRandomPwd())
            {
                $redirectUrl .= '#/profile';
            }
            //this redirection should prompt the user to change his password
            $response = new RedirectResponse($redirectUrl);
        }
        else
        {
            $user->setRememberMeToken($request->cookies->get('REMEMBERME'));
            $serializationCtx = (new SerializationContext())->enableMaxDepthChecks(true);
            $responseArr = $this->jms_serializer->serialize($user, 'json', $serializationCtx);

            $response = new Response($responseArr);
            $response->headers->set('Content-Type', 'application/json');
        }

        return $response;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        $result = array(
            'error' => $this->translator->trans($exception->getMessage(), array(), 'FOSUserBundle'),
        );
        $response = new Response(json_encode($result), 400);
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}