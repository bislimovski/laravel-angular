var mainApp = angular.module('mainApp', ['ngRoute', 'ngCookies']);

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
            authenticated: true
        });

        $routeProvider.when('/gallery/view', {
            templateUrl: 'templates/gallery/gallery-view.html',
            controller: 'galleryController',
            authenticated: true
        });

        $routeProvider.when('/gallery/view/:id', {
            templateUrl: 'templates/gallery/gallery-single.html',
            controller: 'galleryController',
            authenticated: true
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

