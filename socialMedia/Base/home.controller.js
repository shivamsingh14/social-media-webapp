angular.module('socialMedia')
  .controller('HomeController', ['$state', '$scope', function HomeController($state, $scope) {
    $scope.goToHome = function goToHome() {
      $state.go('home.login');
    };
  }]);
