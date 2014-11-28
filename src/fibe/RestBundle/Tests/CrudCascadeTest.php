<?php

namespace fibe\RestBundle\Tests\Controller;

use Doctrine\ORM\EntityManager;
use fibe\RestBundle\Tests\LocalizationFixture;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException;
use Symfony\Component\Form\FormInterface;

class CrudCascadeTest extends WebTestCase
{
  /** @var EntityManager */
  private $em;
  /** @var ContainerInterface */
  private $container;

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
    $entity = new \fibe\ContentBundle\Entity\Localization();
//    $entity = $this->em->getRepository($entityClassName)->find($id);
    $method = "POST";
    $this->em->getRepository("fibe\\ContentBundle\\Entity\\Localization");

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

  /**
   * test to be placed before any array_pop
   */
  public function testGetAndPagination()
  {
    $fixtures = array(static::LOCATION_CLASS);
    $this->loadFixtures($fixtures);
    $entities = LocalizationFixture::$entities;

    $offset = 0;
    $limit = 3;

    $this->client->request(
      'GET',
      sprintf(static::API_URL . '?offset=%d&limit=%d', $offset, $limit),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json')
    );
    $this->assertJsonResponse($this->client->getResponse());
    $decoded = json_decode($this->client->getResponse()->getContent(), true);
    $this->assertEquals(count($decoded), $limit, $decoded);

    $offset = $limit;

    $this->client->request(
      'GET',
      sprintf(static::API_URL . '?offset=%d&limit=%d', $offset, $limit),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json')
    );
    $this->assertJsonResponse($this->client->getResponse());
    $decoded = json_decode($this->client->getResponse()->getContent(), true);
    $this->assertEquals(count($decoded), $limit, $decoded);
    $this->assertEquals($entities[$offset]->getId(), $decoded[0]['id'], $this->client->getResponse());
  }

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

  public function testGet()
  {
    $fixtures = array(static::LOCATION_CLASS);
    $this->loadFixtures($fixtures);
    $entities = LocalizationFixture::$entities;

    $entity = array_pop($entities);
    $this->client->request(
      'GET',
      sprintf(static::API_URL . '/%d', $entity->getId()),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json'));
    $response = $this->client->getResponse();

    $this->assertJsonResponse($response);
    $content = $response->getContent();

    $decoded = json_decode($content, true);
    $this->assertTrue(isset($decoded['id']));
    $this->assertEquals($decoded['id'], $entity->getId(), $decoded);
  }

  public function testHeadRoute()
  {
    $fixtures = array(static::LOCATION_CLASS);
    $this->loadFixtures($fixtures);
    $entities = LocalizationFixture::$entities;

    $entity = array_pop($entities);

    $this->client->request(
      'HEAD',
      sprintf(static::API_URL . '/%d', $entity->getId()),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json')
    );
    $response = $this->client->getResponse();
    $this->assertJsonResponse($response, 200, false);
  }

  public function testPost()
  {
    $this->client->request(
      'POST',
      static::API_URL,
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json',
        'CONTENT_TYPE' => 'application/json'),
      '{"label":"body1"}'
    );

    $this->assertJsonResponse($this->client->getResponse());
    $this->assertContains(
      'label":"body1',
      $this->client->getResponse()->getContent()
    );
  }

  public function testPostLocationActionShouldReturn400WithBadParameters()
  {
    $this->client->request(
      'POST',
      static::API_URL . '',
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json',
        'CONTENT_TYPE' => 'application/json'),
      '{"labels":"body1"}'
    );

    $this->assertJsonResponse($this->client->getResponse(), 400, false);
  }

  public function testPutLocationActionShouldModify()
  {
    $fixtures = array(static::LOCATION_CLASS);
    $this->loadFixtures($fixtures);
    $entities = LocalizationFixture::$entities;

    $entity = array_pop($entities);
    $this->client->request(
      'GET',
      sprintf(static::API_URL . '/%d', $entity->getId()),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json')
    );
    $this->assertEquals(
      200,
      $this->client->getResponse()->getStatusCode(),
      $this->client->getResponse()->getContent()
    );
    $this->client->request(
      'PUT',
      sprintf(static::API_URL . '/%d', $entity->getId()),
      array(),
      array(),
      array(
        'HTTP_ACCEPT' => 'application/json',
        'CONTENT_TYPE' => 'application/json'),
      '{"label":"abc"}'
    );
    $this->assertJsonResponse($this->client->getResponse());

    /* not implemented : responds 400 not found
    $this->assertTrue(
      $this->client->getResponse()->headers->contains(
        'Location',
        sprintf('http://localhost'.static::API_URL.'/%d', $entity->getId())
      ),
      $this->client->getResponse()->headers
    );*/
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
