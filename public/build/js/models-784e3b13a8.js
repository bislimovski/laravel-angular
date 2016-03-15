mainApp.factory('userModel', ['$http', '$cookies', function($http, $cookies){
    var userModel = {};

    userModel.getLogin = function(loginData) {
        //create baseUrl + auth route
        return $http({
            headers: {
                'Content-type': 'application/json'
            },
            url: baseUrl + 'auth',
            method: "POST",
            data: {
                email: loginData.email,
                password: loginData.password
            }
        })
        .success(function(response){
            console.log(response);
            //JSON.parse() is for "parsing" something that was received as JSON.
            //JSON.stringify() is to create a JSON string out of an object/array.
            $cookies.put('auth', JSON.stringify(response));
        })
        .error(function(response, status, headers){
            console.log(data, status, headers);
            alert(response);
        });
    };

    userModel.getAuthStatus = function(){
        var status = $cookies.get('auth');
        if(!status) {
            return false;
        }
        return true;
    };

    userModel.getUserObject = function() {
        var userObject = angular.fromJson($cookies.get('auth'));
        return userObject;
    };

    userModel.getLogout = function(){
      $cookies.remove('auth');
    };

    return userModel;
}]);

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
        },
        getAllGalleries: function(){
            return $http.get(baseUrl + 'gallery');
        },
        getGalleryById: function(id){
            return $http.get(baseUrl + 'gallery/' + id);
        }
    }
}]);
//# sourceMappingURL=models.js.map
