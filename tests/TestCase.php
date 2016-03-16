<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    public function setUp()
    {

    }

    /** @test*/
    public function it_will_test_simple_mock()
    {
        //mock
        $mock = Mockery::mock(App\Http\Controllers\GalleryController::class);
        $mock->shouldReceive('test')->once()->andReturn('mocking');
        var_dump($mock->test());

        //running from controller
        $controller = new App\Http\Controllers\GalleryController();
        var_dump($controller->test());
    }

    /** @test*/
    public function it_will_test_second_mock()
    {
        $mock = Mockery::mock(App\Http\Controllers\GalleryController::class);
        $mock->shouldReceive('test')->once()->andReturn('mocking');
        $mock->test();
    }

    public function tearDown()
    {
        Mockery::close();
    }
}
