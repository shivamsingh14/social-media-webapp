angular.module('socialMedia.user')
  .controller('UsersController', ['userService', '$scope', '$location', '$state',
    function UsersController(userService, $scope, $location, $state) {
      $scope.search = $location.search().search;
      $location.search('search', $scope.search);
      $scope.itemsPerPage = 3;
      $scope.viewUsers = function viewUsers(page) {
        $scope.pagination = {
          current: page,
        };
        if (!page) {
          $location.search('page', 1);
        }
        $location.search('page', page);
        userService.getUserList($scope.itemsPerPage, page, $scope.search).then((response) => {
          $scope.total_count = response.count;
          $location.search('search', $scope.search);
          $scope.users = response.results;
        });
      };
      $scope.viewUsersDetails = function viewUsersDetails(uid) {
        $state.go('dashboard.profile', { id: uid });
      };
      if (!$location.search().page) {
        $scope.viewUsers(1);
      }
      $scope.viewUsers($location.search().page);
    }]);
