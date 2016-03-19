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
        },
        checkActiveLink: function(routeLink) {
            if($location.path() == routeLink){
                return 'make-active';
            }
        }
    });
}]);
mainApp.controller('galleryController', ['$scope', '$location', 'galleryModel', '$timeout', '$routeParams', 'Lightbox',
    function($scope, $location, galleryModel, $timeout, $routeParams, Lightbox) {

    //get all galleries when page is loaded
    galleryModel.getAllGalleries().success(function(response){
        //without timeout
        //$scope.galleries = response;
        //$scope.showGalleries = true;
        $timeout(function(){
            $scope.galleries = response;
            $scope.showGalleries = true;
        }, 1000);
    });

    //single page gallery
    console.log($routeParams.id);
    if($routeParams.id){
        galleryModel.getGalleryById($routeParams.id).success(function(response){
            $scope.singleGallery = response;
            console.log(response);
        });
    }

        $scope.$on('imageAdded', function(event, args){
            $scope.singleGallery = args;
            $scope.$apply();
        });

    //vars
    angular.extend($scope, {
        newGallery: {},
        errorDiv: false,
        errorMessages: [],
        singleGallery: {},
        dropzoneConfig: {
            'options': { // passed into the Dropzone constructor
                'url': baseUrl + 'upload-file'
            },
            'eventHandlers': {
                'sending': function (file, xhr, formData) {
                    //sending the response, file and galleryId
                    console.log('Sending');
                    formData.append('galleryId',$routeParams.id);
                    //if you are using csrfToken
                    //formData.append('_token', csrfToken);
                },
                'success': function (file, response) {
                    //response is printed when post method is successful
                    console.log(response);
                    //add image immediately to the screen, when image is upload
                    $scope.singleGallery.images.push(response);
                    $scope.$emit('imageAdded', $scope.singleGallery);
                }
            }
        }
    });

    //functions
    angular.extend($scope, {
       saveNewGallery: function(addGalleryForm){
           //console.log(addGalleryForm); //you can see all build-in vars and use them; such as $valid
           if(addGalleryForm.$valid){
               //console.log('Correct');
               $scope.formSubmitted = false;
               galleryModel.saveGallery($scope.newGallery).success(function(response){
                   $location.path('gallery/view');
               });

           } else {
               //console.log('Error');
               $scope.formSubmitted = true;
           }
       },
        viewGallery: function(id){
            $location.path('/gallery/view/' + id);
        },
        //lightbox
        openLightboxModal: function (index) {
            console.log($scope.singleGallery.images);
            Lightbox.openModal($scope.singleGallery.images, index);
        },
        deleteImage: function(imageId) {
            console.log(imageId);
            var data = {
                imageId: imageId,
                galleryId: $routeParams.id
            };
            galleryModel.deleteSingleImage(data).success(function(response){
                $scope.singleGallery = response;
            });
        }
    });
}]);
//# sourceMappingURL=controllers.js.map
