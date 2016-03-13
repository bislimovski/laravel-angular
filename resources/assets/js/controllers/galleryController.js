mainApp.controller('galleryController', ['$scope', '$location', 'galleryModel', function($scope, $location, galleryModel) {
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
       }
    });
}]);