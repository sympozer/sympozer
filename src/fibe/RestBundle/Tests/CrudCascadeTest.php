<?php

namespace fibe\RestBundle\Tests;

use Liip\FunctionalTestBundle\Test\WebTestCase;

class CrudCascadeTest extends WebTestCase
{
  const LOCATION_CLASS = "fibe/RestBundle/Tests/Fixtures/LocalizationFixture";

  /**
   * @var \Doctrine\ORM\EntityManager
   */
  private $em;

  public function __construct()
  {
    static::$kernel = static::createKernel();
    static::$kernel->boot();
    $this->em = static::$kernel->getContainer()->get('doctrine.orm.entity_manager');
  }

  /**
   * Rollback changes.
   */
  public function tearDown()
  {
    $this->em->rollback();
    parent::tearDown();
  }

  /**
   * linked entity without id must be persisted
   */
  public function testOneToOneOwningPostWithNewLinkedEntity()
  {
    $formData = array(
      "label" => "jkuiytki",
      "startAt" => "2014-12-02T23:00:00.000Z",
      "endAt" => "2014-12-05T23:00:00.000Z",
      "location" => array(
        "country" => "Jersey",
        "countryCode" => "JE",
        "address" => "Jersey",
        "label" => "Jersey"
      )
    );
    $fixtures = array(static::LOCATION_CLASS);
    $this->loadFixtures($fixtures);
    $entities = LocalizationFixture::$entities;

    $entity = new \fibe\ContentBundle\Entity\Localization();
//    $entity = $this->em->getRepository($entityClassName)->find($id);
    $method = "POST";
    $this->em->getRepository("fibe\\ContentBundle\\Entity\\Localization");
    $form = new LocalizationType();

    /** @var FormInterface */
    $form = $this->container->get("form.factory")->create($form, $entity, array('method' => $method));
    $form->submit($formData, 'PATCH' !== $method);

    if ($form->isValid())
    {
      $entity = $form->getData();
      $this->callBusinessService($entity, get_class($entity), $method);
      $this->em->persist($entity);
      $this->em->flush($entity);
    }
    assertNotNull($entity->getId(), "should have an id ");
  }

  /********** TEST OneToOne & manyToOne owning side ( MainEvent -> Location ) ***********/

  protected function callBusinessService($entity, $entityClassName, $method)
  {
    try
    {
      if ($entityService = $this->container->get('fibe.' . substr($entityClassName, strrpos($entityClassName, '\\') + 1) . 'Service'))
      {
        if (method_exists($entityService, strtolower($method)))
        {
          call_user_func_array(array($entityService, strtolower($method)), array($entity, $entityClassName));
        }
      }
    } catch (ServiceNotFoundException $e)
    {
      //no business service defined, just do nothing
    }
  }

  /**
   * linked entity with id must be updated
   */
  public function testOneToOneOwningPostWithUpdateLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testOneToOneOwningPutWithNewLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testOneToOneOwningPutWithUpdateLinkedEntity()
  {

  }

  /************ TEST OneToOne reverse side ************/

  /**
   * linked entity without id must be persisted
   */
  public function testOneToOneReversePostWithNewLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testOneToOneReversePostWithUpdateLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testOneToOneReversePutWithNewLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testOneToOneReversePutWithUpdateLinkedEntity()
  {

  }

  /************** TEST OneToMany & ManyToMany owning side *************/

  /**
   * linked entity without id must be persisted
   */
  public function testManyToManyOwningPostWithNewLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testManyToManyOwningPostWithUpdateLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testManyToManyOwningPutWithNewLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testManyToManyOwningPutWithUpdateLinkedEntity()
  {

  }

  /************** TEST ManyToMany reverse side *************/

  /**
   * linked entity without id must be persisted
   */
  public function testManyToManyReversePostWithNewLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testManyToManyReversePostWithUpdateLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testManyToManyReversePutWithNewLinkedEntity()
  {

  }

  /**
   * linked entity with id must be updated
   */
  public function testManyToManyReversePutWithUpdateLinkedEntity()
  {

  }


  /*************** helper functions *******************/


  protected function assertJsonResponse(
    $response,
    $statusCode = 200,
    $checkValidJson = true,
    $contentType = 'application/json'
  )
  {
    $this->assertEquals(
      $statusCode,
      $response->getStatusCode(),
      $response
    );
    $this->assertTrue(
      $response->headers->contains('Content-Type', $contentType),
      $response->headers,
      $response->headers
    );

    if ($checkValidJson)
    {
      $decode = json_decode($response->getContent());
      $this->assertTrue(($decode != null && $decode != false),
        'is response valid json: [' . $response->getContent() . ']',
        $response->getContent()
      );
    }
  }

  protected function setUp()
  {
    $kernel = static::createKernel();
    $kernel->boot();
    $this->container = $kernel->getContainer();
    $this->em = $this->container->get('doctrine.orm.entity_manager');
    $this->em->beginTransaction();
  }
}
