<?php
namespace fibe\SecurityBundle\Services;

use Buzz\Client\Curl;
use Buzz\Message\RequestInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 *
 * @author benoitddlp
 */
class SympozerProxyAwareCurl extends Curl
{
    const PROXY_PARAM = 'curl_proxy.address';
    const PROXY_PORT_PARAM = 'curl_proxy.port';
    protected $proxyParams = array();

    function __construct(ContainerInterface $container)
    {
        if ($container->hasParameter(self::PROXY_PARAM))
        {
            $proxy = $container->getParameter(self::PROXY_PARAM);
            if (!empty($proxy))
            {
                $this->proxyParams[CURLOPT_PROXY] = $proxy;
            }
        }
        if ($container->hasParameter(self::PROXY_PORT_PARAM))
        {
            $port = $container->getParameter(self::PROXY_PORT_PARAM);
            if (!empty($port))
            {
                $this->proxyParams[CURLOPT_PROXYPORT] = $port;
            }
        }
    }

    protected function prepare($curl, RequestInterface $request, array $options = array())
    {
        parent::prepare($curl, $request, $this->proxyParams);
    }
}