<?php

namespace fibe\TweetsBundle\Controller;

use fibe\SecurityBundle\Services\TwitterAPI;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Yaml\Exception\RuntimeException;

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
     * @Rest\Get("/twitter-api/search/timeline/{tag}", defaults={"tag"="@sympozer"})
     */
    public function apiAction($tag, Request $request)
    {
        $parameters = array();

        // Retrieve the tweets
        /** @var TwitterAPI $twitter */
        $twitter = $this->get('fibe_security.twitter');

        //$type is # or @
        $type = substr($tag, 0, 1);
        $tag = substr($tag, 1, strlen($tag) - 1);
        // Get tag
        switch ($type)
        {
            case "@":
                $response = $twitter->query('statuses/user_timeline', "GET", "json", $parameters);
                break;

            case "#":
                $parameters["q"] = $tag;
                // Get most recent tweets
                $parameters['result_type'] = "recent";
                $response = $twitter->query('search/tweets', "GET", "json", $parameters);
                break;

            default:
                throw new RuntimeException("invalid twitter prefix! allowed values are : '#', '@'.");
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