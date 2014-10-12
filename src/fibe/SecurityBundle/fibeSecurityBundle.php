<?php

namespace fibe\SecurityBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;


class fibeSecurityBundle extends Bundle
{
  public function getParent()
  {
    return 'FOSUserBundle';
  }
}
