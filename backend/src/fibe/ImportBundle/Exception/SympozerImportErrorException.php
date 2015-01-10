<?php
namespace fibe\ContentBundle\Exception;

/**
 *
 * @author benoitddlp
 */
class SympozerImportErrorException extends \RunTimeException
{
    protected $column;
    protected $value;

    /**
     * @param string $msg
     * @param int $line
     * @param string $column
     * @param string $value
     */
    public function __construct($msg, $line, $column, $value)
    {
        parent::__construct($msg);
        $this->line = $line;
        $this->column = $column;
        $this->value = $value;
    }

    /**
     * @return int
     */
    public function getColumn()
    {
        return $this->column;
    }

    /**
     * @return \Exception
     */
    public function getValue()
    {
        return $this->value;
    }


}
