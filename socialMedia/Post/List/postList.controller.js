angular.module('socialMedia.post')
  .controller('ListController', ['postService', '$scope',
    function ListController(postService, $scope) {
      $scope.loading = true;
      postService.getPosts().then((response) => {
        $scope.posts = response.plain();
        // $scope.posts = [];
        // angular.forEach(postList, (value) => {
        //   .push(value);
        // });
      });
      $scope.loading = false;
    }]);
