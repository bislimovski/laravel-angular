var mainApp = angular.module('mainApp', ['ngRoute', 'ngCookies', 'bootstrapLightbox', 'ui.bootstrap', 'angular-loading-bar']);

mainApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'templates/users/login.html',
            controller: 'userController'
        });

        $routeProvider.when('/dashboard', {
            templateUrl: 'templates/users/dashboard.html',
            controller: 'userController',
            authenticated: true
        });

        $routeProvider.when('/logout', {
    		templateUrl: 'templates/users/logout.html',
            controller: 'userController',
            authenticated: true
        });

        $routeProvider.when('/gallery/add', {
            templateUrl: 'templates/gallery/gallery-add.html',
            controller: 'galleryController',
            authenticated: true,
            //I use same controller in all 3 routes, so I need to add resolve method in all 3 routes
            resolve: {
                galleryData: function(){
                    return 'add';
                }
            }
        });

        $routeProvider.when('/gallery/view', {
            templateUrl: 'templates/gallery/gallery-view.html',
            controller: 'galleryController',
            authenticated: true,
            resolve: {
                galleryData: function(galleryModel){
                    return {
                        //refactoring code
                        galleries: galleryModel.getAllGalleries()
                    };
                }
            }
        });

        $routeProvider.when('/gallery/view/:id', {
            templateUrl: 'templates/gallery/gallery-single.html',
            controller: 'galleryController',
            authenticated: true,
            resolve: {
                galleryData: function(galleryModel, $route){
                    return {
                        singleGallery: galleryModel.getGalleryById($route.current.params.id)
                    };
                }
            }
        });

        $routeProvider.otherwise('/');
    }
]);
//using $cookies
mainApp.run(['$rootScope', '$location', 'userModel', function($rootScope, $location, userModel){

    //if route is change trigger this code!!!
    $rootScope.$on('$routeChangeStart', function(event, next, current){

        //if route have element authenticated: true
        if(next.$$route.authenticated){
            //if user don't have $cookies, return to login page
            if(!userModel.getAuthStatus()){
                $location.path('/');
            }
        }

        //originalPath is build in;
        //if user is logged in, and want to go to login page, redirect to the current page
        if(next.$$route.originalPath == '/'){
            if(userModel.getAuthStatus()){
                $location.path(current.$$route.originalPath);
            }
        }

    });
}]);

//dropzone
//dropzone directive - https://gist.github.com/compact/8118670
mainApp.directive('dropzone', function(){
    return function (scope, element, attrs) {
        var config, dropzone;

        config = scope[attrs.dropzone];

        // create a Dropzone for the element with the given options
        dropzone = new Dropzone(element[0], config.options);

        // bind the given event handlers
        angular.forEach(config.eventHandlers, function (handler, event) {
            dropzone.on(event, handler);
        });
    };
});
//# sourceMappingURL=app.js.map
