<?php
namespace fibe\ImportBundle\Annotation;

use Doctrine\ORM\Mapping\Annotation;

/**
 * Importer annotation.
 *
 * /!\ The header that rules how to parse the imported file
 * /!\   ( and also rules how to serialise the header sent to the frontend as well)
 * /!\   is determined by the position of each annotated properties in the annotated entity!
 * /!\ => So be careful when changing the order of annotated properties!
 *
 * @Annotation
 * @Target("PROPERTY")
 */
class Importer
{
    /**
     * @var string
     */
    public $uniqField = "importCode";

    /**
     * @var string
     */
    public $targetEntity;

    /**
     * can the linked entity be created?
     * @var bool
     */
    public $create = false;

    /**
     * is it a collection?
     * @var bool
     */
    public $collection = false;

    /**
     * @var bool
     */
    public $optional = true;

    /**
     * The pty this annotation is bound with
     * this pty is set in ImprotService
     * @var string
     */
    public $name;

    /**
     * the dateFormat, null if not a date
     * this pty is set in ImprotService
     * @var string
     */
    public $dateFormat;

    /**
     * serialize import config for the current annotated property.
     * @return string
     */
    public function __toString()
    {
        $rtn = $this->name;

        if (!$this->optional)
        {
            $rtn .= "*";
        }

        if ($this->targetEntity)
        {
            $rtn .= "($this->uniqField)";
        }

        if ($this->create)
        {
            $rtn .= "[create=true]";
        }

        if ($this->collection)
        {
            $rtn .= "[collection=true]";
        }

        if ($this->dateFormat)
        {
            $rtn .= "[dateFormat=" . $this->dateFormat . "]";
        }

        return $rtn;
    }

    public function getTargetEntityShortClassName()
    {
        return (new \ReflectionClass($this->targetEntity))->getShortName();
    }
}