<?php

namespace fibe\SecurityBundle\Tests;

use Liip\FunctionalTestBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Client;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\StringInput;
use Symfony\Component\Console\Output\StreamOutput;

class LoginTest extends WebTestCase
{
  private $client;

  private $user;

  function __construct()
  {
    // Create a new client to browse the application
    $this->client = static::createClient();
    $this->user = array(
      'username'  => 'admin',
      'password'  => 'admin',
      'email'  => 'admin@admin.fr',
    );
  }

  public function doLogin($username, $password) {
    $crawler = $this->client->request('GET', '/login');
    $form = $crawler->selectButton('submitButton')->form(array(
      '_username'  => $username,
      '_password'  => $password,
    ));
    return $this->client->submit($form);
  }

  /**
   * test command sympozer:admin:create admin2 admin2@admin.fr admin2
   */
  public function testCreateUser()
  {
    $output = $this->runCommand($this->client, "sympozer:admin:create ".$this->user["username"]." ".$this->user["email"]." ".$this->user["password"]);
    $this->assertContains("Created user ".$this->user["username"], $output, $output);

  }

  public function testLogin()
  {
    $this->client->request('GET', '/user/');
    $this->assertTrue($this->client->getResponse()->isRedirect());

    $this->doLogin("admin", "wrongpwd");
    $this->assertTrue(strpos($this->client->getResponse()->getContent(),"error") !== false);

    $this->doLogin($this->user["username"], $this->user["password"]);
    $this->client->request('GET', '/user/');
    $this->assertEquals($this->client->getResponse()->getStatusCode(), 200, $this->client->getResponse());
  }


  public function testGoogleOAuthRedirection()
  {
    $crawler = $this->client->request('GET', '/connect/google');
    $this->assertTrue($this->client->getResponse()->isRedirect());
    $this->assertContains(
      'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=381296840409-ajut55prn2ahl0n8hakpufia7pbc5ovd.apps.googleusercontent.com&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile'
      , $this->client->getResponse()->headers->get('location')
    );
  }

  protected function assertJsonResponse($response, $statusCode = 200, $checkValidJson =  true)
  {
    $this->assertEquals(
      $statusCode, $response->getStatusCode(),
      $response->getContent()
    );
    $this->assertTrue(
      $response->headers->contains('Content-Type', 'application/json'),
      $response->headers
    );

    if ($checkValidJson) {
      $decode = json_decode($response->getContent());
      $this->assertTrue(($decode != null && $decode != false),
        $response->getContent()
      );
    }
  }
  /**
   * Runs a command and returns it output
   */
  public function runCommand(Client $client, $command)
  {
    $application = new Application($client->getKernel());
    $application->setAutoExit(false);

    $fp = tmpfile();
    $input = new StringInput($command);
    $output = new StreamOutput($fp);

    $application->run($input, $output);

    fseek($fp, 0);
    $output = fread($fp, 4096);
    fclose($fp);

    return $output;
  }
}