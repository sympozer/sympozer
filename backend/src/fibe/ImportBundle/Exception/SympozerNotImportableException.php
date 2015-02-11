<?php
namespace fibe\ImportBundle\Exception;

/**
 *
 * @author benoitddlp
 */
class SympozerNotImportableException extends \RunTimeException
{
    /**
     * @param string $msg
     */
    public function __construct($msg)
    {
        parent::__construct($msg);
    }
}
