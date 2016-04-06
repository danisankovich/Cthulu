var app = angular.module('Cthulu', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('/', { url: '/', templateUrl: 'views/home.ejs', controller: 'mainCtrl' })
  .state('state', { url: '/state/{state}', templateUrl: 'views/state.ejs', controller: 'stateCtrl' })
  .state('profile', { url: '/profile', templateUrl: 'views/profile.ejs', controller: 'profileCtrl' });
}]);
