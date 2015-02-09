<?php

namespace fibe\RestBundle\Listener;

use JMS\Serializer\SerializerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;

//return json error instead of symfony's error
class SerializeExceptionListener
{
    protected $serializer;
    private $logger;

    public function __construct(SerializerInterface $serializer, LoggerInterface $logger = null)
    {
        $this->serializer = $serializer;
        $this->logger = $logger;
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $format = $event->getRequest()->getRequestFormat();
        //if html : just display the symfony exception's page
        if (!$format || $format === "html")
        {
            return;
        }
        $error = $event->getException();

        if (null !== $this->logger)
        {
            $this->logger->critical($error->getMessage());
            foreach (explode("\n", $error->getTraceAsString()) as $trace)
            {
                $this->logger->critical($trace);
            }
        }

        //TODO : do it only in app_dev mode!
        $datas = array(
            'error' => (new \ReflectionClass($error))->getShortName() . ' : ' . $error->getMessage(),
            'stack_trace' => explode("\n", $error->getTraceAsString())
        );

        // $datas[] = array('stacktrace' => $error->getTrace()); // <== NEVER DO THIS! it's causing awkward errors like doctrine annotation not imported o_O
        $content = $this->getSerializer()->serialize($datas, $format);
        $response = new Response($content, 400);
        if (method_exists($error, 'getStatusCode'))
        {
            $response->setStatusCode($error->getStatusCode());
        }
        $event->setResponse($response);
    }

    public function getSerializer()
    {
        return $this->serializer;
    }
}