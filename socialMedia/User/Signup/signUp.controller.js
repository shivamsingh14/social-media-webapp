/* eslint-disable object-shorthand */
angular.module('socialMedia.user')
  .controller('signUpController', ['$scope', 'userService', 'constant', '$cookies', '$rootScope', '$state',
    function signUpController($scope, userService, constant, $cookies, $rootScope, $state) {
      $scope.userSignUpOject = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        date_of_birth: '',
        gender: '',
        password: '',
      };

      $scope.processing = false;
      $scope.registerButton = 'Register';
      function register() {
        if ($scope.registrationForm.$invalid) {
          $scope.requiredErrorMessage = true;
        } else {
          $scope.processing = true;
          $scope.registerButton = 'Signing Up...';
          userService.register($scope.userSignUpOject).then((response) => {
            $scope.processing = false;
            $scope.registerButton = 'Register';
            $cookies.put('token', response.token);
            $rootScope.verified = 0;
            $state.go('dashboard.profile', { id: 0 });
          }, () => {
            $scope.processing = false;
            $scope.registerButton = 'Register';
          });
        }
      }
      angular.extend($scope, {
        register: register,
      });
    }]);
