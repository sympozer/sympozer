<?php
namespace fibe\RestBundle\Services;


use Doctrine\Common\Annotations\Reader;
use Doctrine\ORM\EntityManagerInterface;

/**
 *  helper functions for business service like fibe.MainEventService
 * @author benoitddlp
 */
abstract class AbstractBusinessService
{

  /** @var  Reader */
  protected $reader;
    /** @var  EntityManagerInterface */
    protected $entityManager;
    private $annotationClass = 'Doctrine\\ORM\\Mapping\\Column';

  /**
   * @param EntityManagerInterface $entityManager
   */
    public function setEntityManager(EntityManagerInterface $entityManager)
  {
      $this->entityManager = $entityManager;
  }

  /**
   * @param Reader $reader
   */
    public function setReader(Reader $reader)
    {
        $this->reader = $reader;
  }

  /**
   * check if an attribute has been changed, if so : return the old value
   * @param mixed $entity
   * @param string $attribute
   * @return false | mixed the old attribute
   */
    protected function isDirty($entity, $attribute)
    {
        $uow = $this->entityManager->getUnitOfWork();
        $metaData = $this->entityManager->getClassMetadata(get_class($entity));
        $uow->computeChangeSet($metaData, $entity);
        $changeset = $uow->getEntityChangeSet($entity);

        return isset($changeset[$attribute]) ? $changeset[$attribute][0] : false;
  }

  /**
   * Add a copy of a contextualized object to its global representation for every conference
   * @param mixed $entity
   * @param mixed $entityClassName
   * @param String $setterFct
   * @return false | mixed the old attribute
   */
    protected function createGlobalEntity($entity, $entityClassName, $setterFct)
  {
      if ($entity == null)
      {
          return false;
      }

      $globalEntityClassName = str_replace('Version', '', $entityClassName);
      $globalEntity = $this->entityManager->getRepository($globalEntityClassName)->findOneByLabel($entity->getLabel());

      if ($globalEntity == null)
      {
          $globalEntity = $this->copyVersionObject($globalEntityClassName, $entityClassName, $entity);
      }

      $entity->$setterFct($globalEntity);

      $this->entityManager->persist($entity);
      $this->entityManager->persist($globalEntity);

      return true;
  }

  /**
   * Produce a global object copied from a version object
   * @param String $globalEntityClassName , classname of the global object to produce
   * @param String $entityClassName , classname of the version object to make a copy from
   * @param mixed $versionObject , The object to copy
   * @return mixed , The global object produced from the version object
   */
    protected function copyVersionObject($globalEntityClassName, $entityClassName, $versionObject)
  {
      $globalEntity = new $globalEntityClassName();

      $reflectionEntityObject = new \ReflectionObject(new $entityClassName());

      foreach ($reflectionEntityObject->getProperties() as $reflectionProperty)
      {
          $annotation = $this->reader->getPropertyAnnotation($reflectionProperty, $this->annotationClass);
          if (null !== $annotation)
          {
              if ($annotation->type == 'string' || $annotation->type == 'text')
              {
                  $fieldName = $annotation->name ? $annotation->name : $reflectionProperty->getName();
                  $fieldNameUpperFirst = ucfirst($fieldName);

                  $getter = "get" . $fieldNameUpperFirst;
                  $setter = "set" . $fieldNameUpperFirst;

                  $globalEntity->$setter($versionObject->$getter());
              }
          }
      }

      return $globalEntity;
  }


}