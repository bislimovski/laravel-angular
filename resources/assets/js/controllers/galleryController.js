mainApp.controller('galleryController', ['$scope', '$location', 'galleryModel', '$timeout', '$routeParams', 'Lightbox', 'galleryData',
    function($scope, $location, galleryModel, $timeout, $routeParams, Lightbox, galleryData) {

    ////get all galleries when page is loaded
    //galleryModel.getAllGalleries().success(function(response){
    //    //without timeout
    //    //$scope.galleries = response;
    //    //$scope.showGalleries = true;
    //    $timeout(function(){
    //        $scope.galleries = response;
    //        $scope.showGalleries = true;
    //    }, 1000);
    //});

        //refactored code, get all galleries when page is loaded
        if(galleryData && galleryData.galleries != undefined){
            galleryData.galleries.success(function(response){
                $timeout(function(){
                    $scope.galleries = response;
                    $scope.showGalleries = true;
                }, 1000);
            });
        }

    ////single page gallery
    //console.log($routeParams.id);
    //if($routeParams.id){
    //    galleryModel.getGalleryById($routeParams.id).success(function(response){
    //        $scope.singleGallery = response;
    //        console.log(response);
    //    });
    //}

        //refactored code, single page gallery
        if(galleryData && galleryData.singleGallery != undefined){
            galleryData.singleGallery.success(function(response){
                $scope.singleGallery = response;
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