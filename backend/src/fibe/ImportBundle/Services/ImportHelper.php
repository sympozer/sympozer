<?php
namespace fibe\ImportBundle\Services;

/**
 * util class ImportHelper
 * Class ImportHelper
 * contains the list to
 * @package fibe\ImportBundle\Services
 */
class ImportHelper
{
    public static $entityConfig = array(
        'Event' => array(
            'classpath' => 'fibe\\EventBundle\\Entity',
        ),
        'Location' => array(
            'classpath' => 'fibe\\ContentBundle\\Entity',
        ),
        'Paper' => array(
            'classpath' => 'fibe\\ContentBundle\\Entity',
        ),
        'Person' => array(
            'classpath' => 'fibe\\CommunityBundle\\Entity',
        ),
        'Role' => array(
            'classpath' => 'fibe\\ContentBundle\\Entity',
        ),
    );

    static function getClassNameFromShortClassName($shortClassName)
    {
        if (isset(self::$entityConfig[$shortClassName]))
        {
            return self::$entityConfig[$shortClassName]["classpath"] . "\\" . $shortClassName;
        }
        throw new \Exception("'$shortClassName' is not configured to be imported");
    }
}