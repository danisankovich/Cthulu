app.controller('mainCtrl', function($scope, $state, $http, userService){
  $(document).ready(function() {
    userService.getCurrentUser().success(function(data) {
      $scope.currentUser = data;
    });
    $scope.login = function(user) {
      $http.post('/users/login', user).success(function(user){
        $scope.currentUser = user;
        $('#loginModal').foundation('reveal', 'close');
      }).error(function(err) {
        $scope.loginMessage = "Incorrect Username/Password Combination"
      })
    }
    $scope.register = function(newUser) {
      $scope.newUser = newUser;
      $http.post('/users/register', $scope.newUser).success(function(err, data) {
        if(err.hasOwnProperty('name') === true) {
          sweetAlert("Uh Oh  ", err.message, "error");
          return;
        }
        else if(err.hasOwnProperty('errmsg')) {
          sweetAlert("Uh Oh ", newUser.email + " is already registered", "error");
          return;
        }
        else {
          $scope.currentUser = err;
          $('#loginModal').foundation('reveal', 'close');
        }
      });
    };
    $scope.closeLogin = function() {
      $('#loginModal').foundation('reveal', 'close');
    }

    $scope.loginModal = function() {
      $('#loginModal').foundation('reveal', 'open');
    }
  });
});
