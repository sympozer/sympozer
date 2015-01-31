<?php
namespace fibe\ImportBundle\Annotation;

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
    public $uniqField = "id";

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
     * @var bool
     */
    public $optional = false;

    /**
     * The pty this annotation is bound with
     * @var string
     */
    public $propertyName;

    public function __toString()
    {
        $options = "";

        if ($this->optional)
        {
            $options .= "[optional=true]";
        }

        if ($this->create)
        {
            $options .= "[create=true]";
        }

        return sprintf("%s(%s)%s",
            $this->propertyName,
            $this->uniqField,
            $options
        );
    }

    public function getTargetEntityShortClassName()
    {
        return (new \ReflectionClass($this->targetEntity))->getShortName();
    }
}