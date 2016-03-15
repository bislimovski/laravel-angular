mainApp.controller('galleryController', ['$scope', '$location', 'galleryModel', '$timeout', '$routeParams', function($scope, $location, galleryModel, $timeout, $routeParams) {

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

    //vars
    angular.extend($scope, {
        newGallery: {},
        errorDiv: false,
        errorMessages: []
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
        }
    });
}]);