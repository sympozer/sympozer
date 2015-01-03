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
    public $entity;
}