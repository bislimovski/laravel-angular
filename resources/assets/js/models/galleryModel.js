mainApp.factory('galleryModel', ['$http', function($http) {
    return {
        saveGallery: function(galleryData){
            return $http({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: baseUrl + 'gallery',
                method: "POST",
                data: {
                    name: galleryData.name
                }
            });
        }
    }
}]);