app.factory('api', ['$http', '$q', function($http, $q) {

    return {

    	getData : function(url) {

            var def = $q.defer();

            $http.get(url).success(function(data) {

                def.resolve(data);

            }).error(function() {

                def.reject("Failed to get posts");
            });

            return def.promise;
        }
    }
}]);