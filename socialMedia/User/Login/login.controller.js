/* eslint-disable object-shorthand */
angular.module('socialMedia.user')
  .controller('LoginController', ['$scope', 'userService', 'constant', '$cookies', '$state', '$timeout',
    function LoginController($scope, userService, constant, $cookies, $state) {
      $scope.userLoginOject = {
        username: '',
        password: '',
      };

      $scope.processing = false;
      $scope.loginButton = 'Login';
      function login() {
        if ($scope.loginForm.$invalid) {
          $scope.requiredErrorMessage = true;
        } else {
          $scope.processing = true;
          $scope.loginButton = 'Logging in...';
          userService.login($scope.userLoginOject).then((response) => {
            $scope.processing = false;
            $scope.loginButton = 'Login';
            $cookies.put('token', response.token);
            $state.go('dashboard');
          }, () => {
            $scope.invalidCredentiails = true;
            $scope.processing = false;
            $scope.loginButton = 'Login';
          });
        }
      }
      angular.extend($scope, {
        login: login,
      });
    }]);
