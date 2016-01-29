app.controller('mainCtrl', function($scope, $state, $http, userService){
  userService.getCurrentUser().success(function(data) {
    $scope.user = data;
  });
});
