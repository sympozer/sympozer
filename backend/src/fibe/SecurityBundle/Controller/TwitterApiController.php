<?php

namespace fibe\SecurityBundle\Controller;

use FOS\UserBundle\Model\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class TwitterApiController extends Controller
{
    /**
     * Passes a request to the Twitter API while adding OAuth headers. This enables
     * you to expose the Twitter API on your own domain.
     *
     * @Route("/twitter-api/{name}.{format}", requirements={"name"=".+", "format"="(json|xml)"})
     */
    public function apiAction($name, $format, Request $request)
    {
        $method = $request->getMethod();

        $parameters = array();
        foreach ($request->query as $key => $value) {
            $parameters[$key] = $value;
        }
        foreach ($request->request as $key => $value) {
            $parameters[$key] = $value;
        }

        $user = $this->container->get('security.context')->getToken()->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        // Retrieve the user's timeline

        $twitter = $this->container->get('fibe_security.twitter');
        $twitter->setUser($user);
        $response = $twitter->query($name, $method, $format, $parameters);

        return new Response(
            $response->getContent(),
            $response->getStatusCode(),
            array(
                'Content-Type' => $response->getHeader('Content-Type')
            )
        );
    }
}