var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');

    mix.scripts(['app.js'], 'public/js/app.js');
    mix.scripts(['controllers/userController.js', 'controllers/globalController.js'], 'public/js/controllers.js');
    mix.scripts(['factories/authFactory.js'], 'public/js/factories.js');

    /*it's appending string to a file, called Hashing or Versioning*/
    mix.version(['js/all.js', 'js/controllers.js', 'js/factories.js']);

});
