app.factory('aquestion', ['$http', function($http) {
  return $http.get('http://jservice.io/api/random')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
