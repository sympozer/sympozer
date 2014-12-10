<?php
/**
 * Created by IntelliJ IDEA.
 * User: vinz
 * Date: 02/08/14
 * Time: 21:06
 */

namespace fibe\AdminBundle\AdminUtils;

/**
 * Class EntityUtils
 */
class EntityUtils {

  const ENTITY_EVENT = 'fibe\EventBundle\Entity\Event';
  const ENTITY_LOCATION = 'fibe\ContentBundle\Entity\Location';

  /**
   * @param string     $entity       The fully qualified name of the entity class
   * @param array      $withExcluded : the fields to exclude
   *
   * @return array An array containing all the fields of an entity
   */
  public static function getAllVarsFromEntity($entity, array $withExcluded = null)
  {
    $allMethods = get_class_methods($entity);
    $allGetMethods = array();
    $allSetMethods = array();
    // Pour chaque méthode de l'entité :
    foreach ($allMethods as $method)
    {
      // On récupère les get
      if (EntityUtils::startsWith($method, 'get'))
      {
        $allGetMethods[] = lcfirst(substr($method, 3));
      }
      // On récupère les set
      else if (EntityUtils::startsWith($method, 'set'))
      {
        $allSetMethods[] = lcfirst(substr($method, 3));
      }
    }
    // On réalise l'interesection des get et des set
    $result = array_values(array_intersect($allGetMethods, $allSetMethods));
    // Si on dot réaliser une exclusion
    if (isset($withExcluded))
    {
      $result = self::excludeFields($result, $withExcluded);
    }
    return $result;
  }

  /**
   * Method wich return the fields of an entity without the excluded values
   *
   * @param array $results
   * @param array $withExcluded
   *
   * @return array
   */
  private static function excludeFields(array $results, array $withExcluded)
  {
    $resultWithExclusion = array();
    foreach ($results as $result)
    {
      if (!in_array($result, $withExcluded))
      {
        $resultWithExclusion[] = $result;
      }
    }
    return $resultWithExclusion;
  }

  /**
   * Method that retun true if $var stratsWith $needle
   *
   * @param $var
   * @param $needle
   *
   * @return bool
   */
  private static function startsWith($var, $needle)
  {
    return $needle === "" || strpos($var, $needle) === 0;
  }

} 