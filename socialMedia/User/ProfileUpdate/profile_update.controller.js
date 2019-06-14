angular.module('socialMedia.user')
  .controller('ProfileUpdateController', ['userService', '$cookies', '$scope', '$state',
    function ProfileUpdateController(userService, $cookies, $scope, $state) {
      $scope.user = {
        first_name: '',
      };
      userService.getUser($cookies.get('uid')).then((response) => {
        $scope.owner = response;
      });
      $scope.update = function update() {
        userService.profileUpdate($scope.user).then(() => {
          $state.go('dashboard.profile', { id: '0' });
        });
      };
    }]);
