<?php
namespace fibe\ImportBundle\Exception;

/**
 *
 * @author benoitddlp
 */
class SympozerImportErrorException extends \RunTimeException
{
    protected $column;
    protected $columnNb;
    protected $value;

    /**
     * @param string $msg
     * @param int $line
     * @param string $column
     * @param $columnNb
     * @param string $value
     */
    public function __construct($msg, $line, $columnNb, $column, $value)
    {
        parent::__construct($msg);
        $this->line = $line;
        $this->columnNb = $columnNb;
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
     * @return int
     */
    public function getColumnNb()
    {
        return $this->columnNb;
    }

    /**
     * @return \Exception
     */
    public function getValue()
    {
        return $this->value;
    }


}
