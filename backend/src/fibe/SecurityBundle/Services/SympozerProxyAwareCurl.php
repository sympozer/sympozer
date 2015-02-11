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
    const PROXY_ADDRESS_PARAM = 'curl_proxy.address';
    const PROXY_PORT_PARAM = 'curl_proxy.port';
    protected $proxyParams = array();

    function __construct(ContainerInterface $container)
    {
        if ($container->hasParameter(self::PROXY_ADDRESS_PARAM) && $container->hasParameter(self::PROXY_PORT_PARAM))
        {
            $address = $container->getParameter(self::PROXY_ADDRESS_PARAM);
            $port = $container->getParameter(self::PROXY_PORT_PARAM);

            if (!empty($address) && !empty($port))
            {
                $this->setProxy($address.':'.$port);
            }
        }
    }

    protected function prepare($curl, RequestInterface $request, array $options = array())
    {
        parent::prepare($curl, $request, $this->proxyParams);
    }
}