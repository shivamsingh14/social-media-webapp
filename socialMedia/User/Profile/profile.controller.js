angular.module('socialMedia.user')
  .controller('ProfileController', ['userService', '$scope', '$stateParams', '$state', '$cookies',
    function ProfileController(userService, $scope, $stateParams, $state, $cookies) {
      $scope.followButton = 'Follow';
      $scope.followed = false;
      if (!$stateParams.id) {
        // eslint-disable-next-line no-param-reassign
        $stateParams.id = 0;
      }
      // $scope.currentUser = true;
      // if ($stateParams.id === '0') {
      //   $scope.currentUser = false;
      // }
      userService.profile($stateParams.id).then((response) => {
        const profileList = response;
        $scope.userPosts = [];
        angular.forEach(profileList, (value) => {
          $scope.userPosts.push(value);
        });
        if (!$scope.userPosts[0].id) {
          $scope.owner = response;
        } else {
          $scope.owner = $scope.userPosts[0].owner;
        }
      });
      $scope.update = function update() {
        $state.go('dashboard.profileUpdate');
      };
      $scope.follow = function follow() {
        $scope.followButton = 'Request Sent';
        $scope.followed = true;
        userService.followRequest($stateParams.id).then(() => {
          $scope.followed = true;
        }, () => {
          $scope.followButton = 'Follow';
          $scope.followed = 'false';
        });
      };
    }]);
