const app = angular.module('socialMedia');
app.config(['$stateProvider', '$urlRouterProvider', function socialMediaConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signup');

  $stateProvider
    .state('home', {
      url: '',
      abstract: true,
      templateUrl: 'Base/home.template.html',
      controller: 'HomeController',
      data: {
        loginRequired: false,
      },
    })
    .state('home.signup', {
      url: '/signup',
      templateUrl: 'User/Signup/signup.template.html',
      controller: 'signUpController',
      data: {
        loginRequired: false,
      },
    })
    .state('home.login', {
      url: '/login',
      templateUrl: 'User/Login/login.template.html',
      controller: 'LoginController',
      data: {
        loginRequired: false,
      },
    })
    .state('dashboard', {
      url: '',
      abstract: true,
      templateUrl: 'Base/dashboard.template.html',
      controller: 'dashboardController',
      data: {
        loginRequired: false,
      },
    })
    .state('dashboard.postList', {
      url: '/post-list',
      templateUrl: 'Post/List/post_list.template.html',
      controller: 'ListController',
      data: {
        verificationRequired: true,
        loginRequired: true,
      },
    })
    .state('dashboard.createPost', {
      url: '/create-post',
      templateUrl: 'Post/Create/post_create.template.html',
      controller: 'PostCreateController',
      data: {
        verificationRequired: true,
        loginRequired: true,
      },
    })
    .state('dashboard.myprofile', {
      url: '/profile/',
      templateUrl: 'User/MyProfile/my_profile.template.html',
      controller: 'MyProfileController',
      data: {
        verificationRequired: false,
        loginRequired: true,
      },
    })
    .state('dashboard.profile', {
      url: '/profile/{id}',
      templateUrl: 'User/Profile/profile.template.html',
      controller: 'ProfileController',
      data: {
        verificationRequired: false,
        loginRequired: true,
      },
    })
    .state('dashboard.users', {
      url: '/users',
      templateUrl: 'User/Users/users.template.html',
      controller: 'UsersController',
      data: {
        verificationRequired: false,
        loginRequired: true,
      },
    })
    .state('verification', {
      url: '/confirm/{id}/{token}',
      controller: 'VerificationController',
      data: {
        loginRequired: true,
      },
    })
    .state('dashboard.pending', {
      url: '/pending/',
      templateUrl: 'User/Pending/pending.template.html',
      controller: 'PendingController',
      data: {
        loginRequired: true,
      },
    })
    .state('dashboard.sent', {
      url: '/sent/',
      templateUrl: 'User/Sent/sent.template.html',
      controller: 'SentController',
      data: {
        loginRequired: true,
      },
    })
    .state('dashboard.profileUpdate', {
      url: '/profile/update',
      templateUrl: 'User/ProfileUpdate/profile_update.template.html',
      controller: 'ProfileUpdateController',
      data: {
        loginRequired: true,
      },
    });
}]);

app.run(['$transitions', '$cookies', '$rootScope', 'Restangular', 'constant', 'userService',
  function socialMediaRun($transitions, $cookies, $rootScope, Restangular, constant, userService) {
    $transitions.onBefore({}, (transition) => {
      if ($cookies.get('token')) {
        $rootScope.ongoing1 = true;
        userService.getUser(0).then((response) => {
          $rootScope.ongoing1 = false;
          $cookies.put('uid', response.id);
          if (response.verification_status === true) {
            $rootScope.verified = 1;
          }
        });
      }
      if (transition.to().data.verificationRequired && (!$rootScope.verified)) {
        return transition.router.stateService.target('dashboard.users');
      }
      if (transition.to().data.loginRequired && !($cookies.get('token'))) {
        return transition.router.stateService.target('home.login');
      } if (!transition.to().data.loginRequired && ($cookies.get('token'))) {
        return transition.router.stateService.target('dashboard.postList');
      }
      return true;
    });
    Restangular.setBaseUrl(constant.URL.BASE_URL);

    Restangular.addFullRequestInterceptor((element, operation, what, url, headers) => {
      let myHeader;
      if ((operation === 'post' && (url === constant.URL.BASE_URL + constant.URL.USER_LOGIN || url === constant.URL.BASE_URL + constant.URL.USERS)) || !$cookies.get('token')) {
        myHeader = headers;
      } else {
        headers.Authorization = `Token ${  $cookies.get('token')}`;
        myHeader = headers;
      }
      return {
        headers: myHeader,
      };
    });
  }]);
