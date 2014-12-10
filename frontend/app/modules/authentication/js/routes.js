/**
 * Authentication module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('authenticationApp')
  .config(
  ['$routeProvider',
    function ($routeProvider)
    {
      $routeProvider
//        .when('/signin', {
//          templateUrl: globalConfig.app.modules.authentication.urls.partials + 'signin.html',
//          controller: 'signinCtrl'
//        })
//        .when('/signup', {
//          templateUrl: globalConfig.app.modules.authentication.urls.partials + 'signup.html',
//          controller: 'signupCtrl'
//        })
//        .when('/signout', {
//          templateUrl: globalConfig.app.modules.authentication.urls.partials + 'signout.html',
//          controller: 'signoutCtrl'
//        })
        .when('/home/authentication/account', {
          templateUrl: globalConfig.app.modules.authentication.urls.partials + 'account.html',
          controller: 'accountCtrl'
        })
        .when('/confirm/:token', {
          templateUrl: globalConfig.app.urls.partials + 'home/home.html',
          controller: 'confirmCtrl'
        })
        .when('/forgotten_password', {
          templateUrl: globalConfig.app.modules.authentication.urls.partials + 'reset-pwd-request.html',
          controller: 'resetPwdRequestCtrl'
        })
        .when('/reset/:token', {
          templateUrl: globalConfig.app.urls.partials + 'home/home.html',
          controller: 'resetPwdCtrl'
        })
        .otherwise({
          redirectTo: '/login'
        });
    }
  ]);