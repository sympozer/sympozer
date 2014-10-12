<?php
namespace fibe\RestBundle\Services;


use Doctrine\Common\Annotations\Reader;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\SecurityContextInterface;

/**
 *
 * @author benoitddlp
 */

abstract class AbstractBusinessService {


    protected $reader;
    protected $entityManager;
    protected $securityContext;
    private $annotationClass = 'Doctrine\\ORM\\Mapping\\Column';

    public function __construct(EntityManager $entityManager, SecurityContextInterface $securityContext, Reader $reader)
    {
        $this->entityManager   = $entityManager;
        $this->reader          = $reader;
        $this->securityContext = $securityContext;
    }

    /**
     * check if an attribute has been changed, if so : return the old value
     * @param EntityManagerInterface $em
     * @param mixed $entity
     * @param string $attribute
     * @return false | mixed the old attribute
     */
    protected function isDirty(EntityManagerInterface $em, $entity, $attribute)
    {
        $uow = $em->getUnitOfWork();
        $metaData = $em->getClassMetadata(get_class($entity));
        $uow->computeChangeSet($metaData, $entity);
        $changeset = $uow->getEntityChangeSet($entity);
        return isset($changeset[$attribute]) ? $changeset[$attribute][0] : false;
    }

    /**
     * Add a copy of a contextualized object to its global representation for every conference
     * @param EntityManagerInterface $em
     * @param mixed $entity
     * @param mixed $entityClassName
     * @param String $setterFct
     * @return false | mixed the old attribute
     */
    protected function createGlobalEntity(EntityManagerInterface $em, $entity, $entityClassName, $setterFct)
    {
        if($entity == null){
            return false;
        }

        $globalEntityClassName = str_replace('Version', '', $entityClassName);
        $globalEntity = $em->getRepository($globalEntityClassName)->findOneByLabel($entity->getLabel());

        if($globalEntity == null){
            $globalEntity = $this->copyVersionObject($globalEntityClassName, $entityClassName, $entity );
        }

        $entity->$setterFct($globalEntity);

        $em->persist($entity);
        $em->persist($globalEntity);
        $em->flush();

        return true;
    }


    /**
     * Produce a global object copied from a version object
     * @param String $globalEntityClassName, classname of the global object to produce
     * @param String $entityClassName, classname of the version object to make a copy from
     * @param mixed $versionObject, The object to copy
     * @return mixed | The global object produce from the version object
     */
    protected function copyVersionObject($globalEntityClassName, $entityClassName, $versionObject){
        $globalEntity = new $globalEntityClassName();

        $reflectionEntityObject = new \ReflectionObject(new $entityClassName());

        foreach ($reflectionEntityObject->getProperties() as $reflectionProperty) {
            $annotation = $this->reader->getPropertyAnnotation($reflectionProperty, $this->annotationClass);
            if (null !== $annotation) {
                if($annotation->type == 'string' || $annotation->type == 'text') {
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