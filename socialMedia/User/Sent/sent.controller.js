angular.module('socialMedia.user')
  .controller('SentController', ['userService', '$scope', '$state',
    function ProfileController(userService, $scope, $state) {
      userService.sentRequests(53).then((response) => {
        $scope.sentRequests = response.results;
      });
      $scope.cancel = function cancel(index) {
        const uid = $scope.sentRequests[index].request_to.id;
        userService.deleteRequest(uid).then(() => {
          $state.reload();
        });
      };
    }]);
