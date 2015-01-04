<?php
namespace fibe\ContentBundle\Annotation;

/**
 * Importer annotation.
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