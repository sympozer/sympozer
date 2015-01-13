<?php

namespace fibe\TweetsBundle\Controller;

use fibe\SecurityBundle\Services\TwitterAPI;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TwitterApiSearchTagController extends FOSRestController
{
    /**
     * controller used to expose url to ws-config
     * /!\ do not remove
     *
     * @Rest\Get("/twitter-api/search", name="tweets_twitter_get")
     * @Rest\View
     */
    public function importAction(Request $request, $shortClassName)
    {
    }

    /**
     * Passes a request to the Twitter API while adding OAuth headers. This enables
     * you to expose the Twitter API on your own domain.
     *
     * @Rest\Get("/twitter-api/search/timeline/{tag}/{type}", defaults={"tag"="sympozer", "type"=""}, name="tweets_twitter_get")
     */
    public function apiAction($tag, $type, Request $request)
    {
        $parameters = array();

        // Retrieve the tweets
        /** @var TwitterAPI $twitter */
        $twitter = $this->get('fibe_security.twitter');

        if ($type == "person")
        {
            // Get tag
            $parameters["screen_name"] = $tag;
            $parameters['count'] = "15";
            $response = $twitter->query('statuses/user_timeline', "GET", "json", $parameters);
        }
        else
        {
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