<?php

namespace fibe\TweetsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function getAction($tag)
    {
        $data = array(
            'tag' => $tag
        );

        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');

        return $response;

        //return new JsonResponse($json);

        //return new Response($json);
    }
}
