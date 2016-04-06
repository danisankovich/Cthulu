app.controller('stateCtrl', function($scope, $rootScope, $state, $http, userService){
  userService.getCurrentUser().success(function(data) {
    $rootScope.currentUser = data;
  });
  $scope.toState= function(state) {
    $state.go('state', {state: state});
  };
  $scope.whichState = $state.params.state;
});
