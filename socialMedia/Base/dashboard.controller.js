angular.module('socialMedia')
  .controller('dashboardController', ['$cookies', '$rootScope', '$state', '$scope', 'controlsService', function dashboardController($cookies, $rootScope, $state, $scope, controlsService) {
    $scope.logout = function logout() {
      controlsService.logoutUser().then(() => {
        if ($cookies.get('token')) {
          $cookies.remove('token');
        }
        $state.go('home.login');
      }, () => {
        if ($cookies.get('token')) {
          $cookies.remove('token');
        }
        $state.go('home.login');
      });
    };
    $scope.postList = function postList() {
      $state.go('dashboard.postList');
    };
  }]);
