<?php

namespace fibe\SecurityBundle\Controller;

use FOS\UserBundle\Model\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class TwitterApiSearchTagController extends Controller
{
    /**
     * Passes a request to the Twitter API while adding OAuth headers. This enables
     * you to expose the Twitter API on your own domain.
     *
     * @Route("/twitter-api/search/{tag}/{type}", defaults={"tag"="sympozer", "type"=""})
     * @Template()
     */
    public function apiAction($tag, $type, Request $request)
    {
        $method = $request->getMethod();

        $parameters = array();



        // Retrieve the tweets
        $twitter = $this->container->get('fibe_security.twitter');

        if($type == "person"){
            // Get tag
            $parameters["screen_name"] = $tag;
            $parameters['count'] = "15";
            $response = $twitter->query('statuses/user_timeline', "GET", "json", $parameters);
        }else {
            // Get tag
            $parameters["q"] = $tag;
            // Get most recent tweets
            $parameters['result_type'] = "recent";
            $response = $twitter->query('search/tweets', "GET", "json", $parameters);
        }
        return new Response(
            $response->getContent(),
            $response->getStatusCode(),
            array(
                'Content-Type' => $response->getHeader('Content-Type')
            )
        );
    }
}