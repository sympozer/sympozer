<?php
namespace fibe\ImportBundle\Services;

use Doctrine\Common\Annotations\Reader;
use Doctrine\ORM\Mapping\Column;
use fibe\ImportBundle\Annotation\Importer;
use fibe\ImportBundle\Exception\SympozerNotImportableException;
use Psr\Log\LoggerInterface;

/**
 *
 * @author benoitddlp
 */
class ImportConfigService
{
    const IMPORT_ALL = "all";
    const DATE_FORMAT = 'Y-m-d';
    const DATETIME_FORMAT = 'Y-m-d H:i';

    protected $reader;
    protected $log;

    function __construct(Reader $reader, LoggerInterface $log)
    {
        $this->reader = $reader;
        $this->log = $log;
    }

    /**
     * @param $className
     * @param bool $asString
     * @return array
     * @internal param $shortClassName
     */
    public function fromClassName($className, $asString = false)
    {
        return $this->fromShortClassName((new \ReflectionClass($className))->getShortName(), $asString);
    }

    /**
     * @param $shortClassName
     * @param bool $asString
     * @return array
     * @throws \Exception
     */
    public function fromShortClassName($shortClassName, $asString = false)
    {
        if ($shortClassName == self::IMPORT_ALL)
        {
            $return = array();
            foreach (ImportHelper::$entityConfig as $shortClassName => $aclEntity)
            {
                try
                {
                    $importFields = $this->getImportConfig($shortClassName, $asString);
                    array_unshift($importFields, $shortClassName);
                    $return[] = $importFields;
                }
                catch (SympozerNotImportableException $e)
                {
                    //ignore not importable pties
                }
            }

            return $return;
        }
        else
        {
            $importFields = $this->getImportConfig($shortClassName, $asString);
            return $importFields;
        }
    }


    /**
     * getImportConfig
     *
     * Parses Importer annotation and return the whole import config for $entityClassName
     *
     * @param $shortClassName
     * @param $asString
     * @return array
     * @throws \Exception
     */
    protected function getImportConfig($shortClassName, $asString)
    {

        $entityClassName = ImportHelper::getClassNameFromShortClassName($shortClassName);
        $entity = new $entityClassName();

        $importFields = [];
        $importerAnnotationClass = get_class(new Importer());
        $columnAnnotationClass = get_class(new Column());

        $reflectionObject = new \ReflectionObject($entity);

        foreach ($reflectionObject->getProperties() as $reflectionProperty)
        {
            /** @var Importer $importerAnnot */
            if (null !== $importerAnnot = $this->reader->getPropertyAnnotation($reflectionProperty, $importerAnnotationClass))
            {
                //set property name to annotation
                if (empty($importerAnnot->name))
                {
                    $importerAnnot->name = $reflectionProperty->getName();
                }

                /** @var Column $columnAnnot */
                if (null !== $columnAnnot = $this->reader->getPropertyAnnotation($reflectionProperty, $columnAnnotationClass))
                {
                    switch ($columnAnnot->type)
                    {
                        case "datetime":
                            $importerAnnot->dateFormat = self::DATETIME_FORMAT;
                            break;
                        case "date":
                            $importerAnnot->dateFormat = self::DATE_FORMAT;
                            break;
                    }
                }

                if ($asString)
                {
                    $field = (string) $importerAnnot; //call __toString()
                }
                else
                {
                    $field = $importerAnnot;
                }
                $importFields[] = $field;
            }
        }
//        \Doctrine\Common\Util\Debug::dump($importFields);

        if (count($importFields) == 0)
        { //no Importer annotation found
            throw new SympozerNotImportableException("Cannot import $entityClassName : No @Importer in $entityClassName.");
        }

        if (isset($importFields[0]) && strpos($importFields[0], 'importCode') === false)
        { //ensure importCode is first
            throw new SympozerNotImportableException("Cannot import $entityClassName : The property 'importCode' must be the first annotated with @Importer in $entityClassName.");
        }

        return $importFields;
    }
}