angular.module('socialMedia')
  .service('controlsService', ['Restangular', 'constant', function (Restangular, constant) {
    this.logoutUser = function logoutUser() {
      return Restangular.one(constant.URL.USER_LOGOUT).remove();
    };
    this.verifyUser = function verifyUser(id, token) {
      return Restangular.oneUrl(constant.URL.USER_CONFIRM.replace('id', id).replace('token', token)).get();
    };
  }]);
