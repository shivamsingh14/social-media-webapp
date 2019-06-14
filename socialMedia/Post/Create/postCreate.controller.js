angular.module('socialMedia.user')
  .controller('PostCreateController', ['$scope', '$state', '$uibModal', '$log', function PostCreateController($scope, $state, $uibModal, $log) {
    $scope.pc = this;
    $scope.pc.data = 'Lorem Name Test';

    const modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'Post/Create/myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'pc',
      windowClass: 'show',
      size: 'lg',
      resolve: {
        data() {
          return $scope.pc.data;
        },
      },
    });

    modalInstance.result.then(() => {
      alert("now I'll close the modal");
    });
  }]);

angular.module('socialMedia.user')
  .controller('ModalInstanceCtrl', ['$state', '$scope', '$uibModalInstance', 'data', 'postService', function ($state, $scope, $uibModalInstance, data, postService) {
    $scope.pc = this;
    $scope.uploadImage = false;
    $scope.pc.data = data;

    $scope.image = function () {
      $scope.uploadImage = true;
    };

    $scope.create = function () {
      postService.createPost($scope.content_text, $scope.visibility, $scope.myFile).then(() => {
      });
      $uibModalInstance.close();
      $state.go('dashboard.postList');
    };

    $scope.cancel = function () {
      alert('You clicked the cancel button.');
      $uibModalInstance.dismiss('cancel');
      $state.go('dashboard.postList');
    };
  }]);

angular.module('socialMedia.user')
  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link(scope, element, attrs) {
        const model = $parse(attrs.fileModel);
        const modelSetter = model.assign;

        element.bind('change', () => {
          scope.$apply(() => {
            modelSetter(scope, element[0].files[0]);
          });
        });
      },
    };
  }]);
