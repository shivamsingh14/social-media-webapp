angular.module('socialMedia.user')
  .controller('PendingController', ['userService', '$scope', '$state',
    function ProfileController(userService, $scope, $state) {
      userService.pendingRequests().then((response) => {
        $scope.requests = response.results;
      });
      // userService.sentRequests().then((response) => {
      //   $scope.sentRequests = response.results;
      // });
      $scope.accept = function accept(index) {
        const friendObject = {
          user_1: $scope.requests[index].request_from.id,
          user_2: $scope.requests[index].request_to,
        };
        userService.acceptRequest(friendObject).then(() => {
          $state.reload();
        }, () => {
        });
      };
    }]);
