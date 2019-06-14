angular.module('socialMedia')
  .constant('constant', {
    REQUIRED_FIELD_ERROR: 'This Field is Required',
    URL: {
      BASE_URL: 'http://localhost:8000/api',
      USER_CONFIRM: '/users/confirm/id/token/',
      USER_LOGOUT: '/users/logout/',
      USER_LOGIN: '/users/login/',
      USERS: '/users/',
      USER_DETAIL: '/users/details/id',
      USER_LIST: 'users/',
      MY_PROFILE: 'users/profile/',
      USER_PROFILE: 'users/profile/id',
      PENDING: 'users/pending/',
      ACCEPT: 'users/accept/',
      UPDATE: 'users/',
      FOLLOW: 'users/friend-request/id',
      SENT: 'users/sent-request/id',
    },
  });
