mainApp.controller('userController', ['$scope', '$http', '$location', 'userModel', function($scope, $http, $location, userModel){
	
	//extend() - 
	angular.extend($scope, {
		doLogin: function() {
			var auth = {
				email: $scope.login.email,
				password: $scope.login.password
			};
			userModel.getLogin(auth).then(function(){
				$location.path('/dashboard');
			});
		}
		//move doLogout() inside menu, navController
		//doLogout: function() {
		//	userModel.getLogout();
		//	$location.path('/');
		//}

	});

	angular.extend($scope, {
		login: {
			email: 'ivan@ivan.com',
			password: 'ivan'
		}
	});
}]);

//********Controller without repository*************
//return $http({
//	headers: {
//		'Content-type': 'application/json'
//	},
//	url: baseUrl + 'auth',
//	method: "POST",
//	data: {
//		email: loginData.email,
//		password: loginData.password
//	}
//})
//	.success(function(response){
//		console.log(response);
//		//JSON.parse() is for "parsing" something that was received as JSON.
//		//JSON.stringify() is to create a JSON string out of an object/array.
//		//$cookies.put('auth', JSON.stringify(response));
//		$cookies.put('auth', response);
//	})
//	.error(function(response, status, headers){
//		alert(response);
//	});
mainApp.controller('globalController', ['$scope', function($scope) {
    $scope.global = {};
    $scope.global.navUrl = 'templates/partials/nav.html'
}]);
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
        }
    });
}]);
//# sourceMappingURL=controllers.js.map
