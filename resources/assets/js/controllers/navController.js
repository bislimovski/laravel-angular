mainApp.controller('navController', ['$scope', 'userModel', '$location', function($scope, userModel, $location) {

    //vars
    angular.extend($scope, {
        user: userModel.getUserObject(),
        navUrl: [{
            link: 'Home',
            url: '/dashboard',
            //dropdown links
            subMenu: [
                {
                    link: 'View Gallery',
                    url: '/gallery/view'
                },
                {
                    link: 'Add Gallery',
                    url: '/gallery/add'
                }
            ]
        },  //one more menu item
            {
                link: 'Test',
                url: '/test'
            }
        ]
    });

    //methods
    angular.extend($scope, {
        doLogout: function() {
            userModel.getLogout();
            $location.path('/');
        },
        checkActiveLink: function(routeLink) {
            if($location.path() == routeLink){
                return 'make-active';
            }
        }
    });
}]);