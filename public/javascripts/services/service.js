app.service('userService', function($http) {
  this.getCurrentUser = function() {
    return $http.get('/user').success(function(user) {
        if(user) {
          return user;
        }
      });
  };
});
