angular.module('socialMedia.user')
  .service('userService', ['Restangular', 'constant',
    function userService(Restangular, constant) {
      this.login = function login(userLoginOject) {
        return Restangular.all(constant.URL.USER_LOGIN).post(userLoginOject);
      };

      this.register = function register(userSignUpOject) {
        return Restangular.all(constant.URL.USERS).post(userSignUpOject);
      };
      this.getUser = function getUser(uid) {
        return Restangular.one(constant.URL.USER_DETAIL.replace('id', uid)).get();
      };
      this.getUserList = function getUserList(lim, offset, search) {
        const params = { limit: lim, offset: (lim * (offset - 1)), first_name__icontains: search };
        return Restangular.one(constant.URL.USER_LIST).get(params);
      };
      this.myProfile = function myProfile() {
        return Restangular.one(constant.URL.MY_PROFILE).get();
      };
      this.profile = function profile(uid) {
        return Restangular.one(constant.URL.USER_PROFILE.replace('id', uid)).get();
      };
      this.pendingRequests = function pendingRequests() {
        return Restangular.one(constant.URL.PENDING).get();
      };
      this.acceptRequest = function acceptRequest(friendObject) {
        return Restangular.all(constant.URL.ACCEPT).post(friendObject);
      };
      this.profileUpdate = function profileUpdate(profileObject) {
        return Restangular.one(constant.URL.UPDATE).patch(profileObject);
      };
      this.followRequest = function followRequest(uid) {
        return Restangular.all(constant.URL.FOLLOW.replace('id', uid)).post({});
      };
      this.sentRequests = function sentRequests(uid) {
        return Restangular.one(constant.URL.SENT.replace('id', uid)).get();
      };
      this.deleteRequest = function deleteRequest(uid) {
        return Restangular.one(constant.URL.SENT.replace('id', uid)).remove();
      };
    }]);
