mainApp.controller('userController', ['$scope', '$http', '$location', function($scope){
	
	//extend() - 
	angular.extend($scope, {
		login: function(loginForm) {
			//create baseUrl + auth route
			$http({
				headers: {
					'Content-type': 'application/json'
				},
				url: baseUrl + 'auth',
				method: "POST",
				data: {
					email: $scope.login.username,
					password: $scope.login.password
				};
			})
			.success(function(response){
				console.log(response);
				//redirect to other page
				$location.path('/dashboard');
			})
			.error(function(response, status, headers){
				alert(response);
			});
		}
	});
}]);