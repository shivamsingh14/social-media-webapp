angular.module('socialMedia')
  .controller('VerificationController', ['$state', 'controlsService', '$stateParams', '$rootScope',
    function dashboardController($state, controlsService, $stateParams, $rootScope) {
      console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbb');
      controlsService.verifyUser($stateParams.id, $stateParams.token).then(() => {
        $rootScope.verified = 1;
        $state.go('dashboard');
      }, () => {
        console.log('error in verification');
      });
    }]);
