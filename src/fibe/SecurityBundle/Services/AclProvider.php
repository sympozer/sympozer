<?php
namespace fibe\SecurityBundle\Services;

use Symfony\Component\Security\Acl\Dbal\MutableAclProvider;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;

// filter-a-list-of-domain-objects-according-to-a-certain-use
// http://stackoverflow.com/questions/6621220/how-do-one-use-acl-to-filter-a-list-of-domain-objects-according-to-a-certain-use


class AclProvider extends MutableAclProvider
{

  /**
   * Get the entities Ids for the className that match the given role & mask
   *
   * @param string       $className
   * @param integer      $mask
   * @param array|string $roles
   * @param bool         $asString - Return a comma-delimited string with the ids instead of an array
   *
   * @throws \RuntimeException
   * @return bool|array|string - True if its allowed to all entities, false if its not
   *          allowed, array or string depending on $asString parameter.
   */
  public function getAllowedEntitiesIds($className, $mask, array $roles = array(), $asString = true)
  {
    if (!defined($mask = 'Symfony\Component\Security\Acl\Permission\MaskBuilder::MASK_' . $mask))
    {
      throw new \RuntimeException('There was no code defined for mask ' . $mask . '!');
    }
    $mask = constant($mask);

    // Check for class-level global permission (its a very similar query to the one
    // posted above
    // If there is a class-level grant permission, then do not query object-level
    // if ($this->_maskMatchesRoleForClass($className, $roles, $requiredMask)) {
    //     return true;
    // }

    // Query the database for ACE's matching the mask for the given roles
    $sql = $this->_getEntitiesIdsMatchingRoleMaskSql($className, $roles, $mask);
    $ids = $this->connection->executeQuery($sql)->fetchAll(\PDO::FETCH_COLUMN);

    // No ACEs found
    if (!count($ids))
    {
      return false;
    }

    if ($asString)
    {
      return implode(',', $ids);
    }

    return $ids;
  }

  private function _getEntitiesIdsMatchingRoleMaskSql($className, array $roles, $mask)
  {
    $rolesSql = array();
    foreach ($roles as $role)
    {
      $rolesSql[] = 's.identifier = ' . $this->connection->quote($role);
    }
    $rolesSql = count($rolesSql) > 0 ? 'AND (' . implode(' OR ', $rolesSql) . ')' : '';

    $sql = <<<SELECTCLAUSE
        SELECT 
            oid.object_identifier
        FROM 
            {$this->options['entry_table_name']} e
        JOIN 
            {$this->options['oid_table_name']} oid ON (
            oid.class_id = e.class_id
        )
        JOIN {$this->options['sid_table_name']} s ON (
            s.id = e.security_identity_id
        )     
        JOIN {$this->options['class_table_name']} class ON (
            class.id = e.class_id
        )
        WHERE 
            {$this->connection->getDatabasePlatform()->getIsNotNullExpression('e.object_identity_id')}
            AND (e.mask - %d >=0)
            $rolesSql
            AND class.class_type = %s
       GROUP BY
            oid.object_identifier    
SELECTCLAUSE;

    return sprintf(
      $sql,
      $mask,
      $this->connection->quote($className)
    );
  }
}