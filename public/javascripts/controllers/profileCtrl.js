app.controller('profileCtrl', function($scope, $rootScope, $state, $http, userService){
  userService.getCurrentUser().success(function(data) {
    $rootScope.currentUser = data;
  });
});
