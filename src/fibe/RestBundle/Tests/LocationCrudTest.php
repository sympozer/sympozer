<?php

namespace fibe\RestBundle\Tests\Controller;

use Liip\FunctionalTestBundle\Test\WebTestCase;

class LocationCrudTest extends WebTestCase
{

  const LOCATION_CLASS = 'fibe\RestBundle\Tests\LocalizationFixture';
  const API_URL = "/api/locations";

  private $client;

  function __construct()
  {
    // Create a new client to browse the application
    $this->client = static::createClient();
  }


  /**
   * test to be placed before any array_pop otherwise we loose indexes
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


  // @TODO : change by an entity with two text field so we can perform this test

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

  public function testPatch()
  {
    $fixtures = array(static::LOCATION_CLASS);
    $this->loadFixtures($fixtures);
    $entities = LocalizationFixture::$entities;

    $entity = array_pop($entities);
    $newDesc = "def";

    $this->client->request(
      'PATCH',
      sprintf(static::API_URL . '/%d', $entity->getId()),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json',
        'CONTENT_TYPE' => 'application/json'),
      '{"description":"' . $newDesc . '"}'
    );

    $this->assertJsonResponse($this->client->getResponse());

    $this->client->request(
      'GET',
      sprintf(static::API_URL . '/%d', $entity->getId()),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json'));
    $response = $this->client->getResponse();

    $decoded = json_decode($response->getContent(), true);
    $this->assertTrue(isset($decoded['id']));
    $this->assertEquals($decoded['label'], $entity->getLabel(), $response);
    $this->assertEquals($decoded['description'], $newDesc, $response);
  }

  public function testSort()
  {
    $fixtures = array(static::LOCATION_CLASS);
    $this->loadFixtures($fixtures);
    $entities = LocalizationFixture::$entities;

    $order = "label";

    $this->client->request(
      'GET',
      sprintf(static::API_URL . '?order[%s]=DESC', $order),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json')
    );
    $this->assertJsonResponse($this->client->getResponse());
    $decoded = json_decode($this->client->getResponse()->getContent(), true);
    $this->assertEquals(
      $entities[count($entities) - 1]->getId(),
      $decoded[0]['id'],
      $this->client->getResponse()
    );
  }

  // @TODO : test linked entity
  // @TODO : test search
  // @TODO : test search on linked entity

  /*
  not implemented : responds 400 not found instead of create a new entity
  public function testPutLocationActionShouldCreate()
  {
      $id = 0;
      $this->client->request('GET',
        sprintf(static::API_URL.'/%d', $id),
        array(),
        array(),
        array('HTTP_ACCEPT' => 'application/json')
      );

      $this->assertEquals(
          404,
          $this->client->getResponse()->getStatusCode(),
          $this->client->getResponse()->getContent()
      );

      $this->client->request(
          'PUT',
          sprintf(static::API_URL.'/%d', $id),
          array(),
          array(),
          array('HTTP_ACCEPT' => 'application/json',
            'CONTENT_TYPE' => 'application/json'),
        '{"label":"abc"}'
      );

      $this->assertJsonResponse($this->client->getResponse(), 201, false);
  }*/

  public function testSearch()
  {
    $fixtures = array(static::LOCATION_CLASS);
    $this->loadFixtures($fixtures);
    $entities = LocalizationFixture::$entities;

    $expectedLabel = "label-test-search";
    $testSearch = "st-se";

    $this->client->request(
      'GET',
      sprintf(static::API_URL . '?query=%s', $testSearch),
      array(),
      array(),
      array('HTTP_ACCEPT' => 'application/json')
    );
    $this->assertJsonResponse($this->client->getResponse());
    $decoded = json_decode($this->client->getResponse()->getContent(), true);
    $this->assertEquals(
      $entities[count($entities) - 1]->getLabel(),
      $decoded[0]['label'],
      $this->client->getResponse()
    );
  }
}
