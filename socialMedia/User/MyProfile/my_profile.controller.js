angular.module('socialMedia.user')
  .controller('MyProfileController', ['userService', '$scope',
    function MyProfileController(userService, $scope) {
      userService.myProfile().then((response) => {
        $scope.owner = response;
        console.log(response.first_name);
        $scope.userPost = response.userPost;
        console.log(response);
      });
    }]);
