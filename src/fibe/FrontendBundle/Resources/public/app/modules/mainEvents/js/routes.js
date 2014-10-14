/**
 * Conference module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('mainEventsApp')
  .config(
  ['$routeProvider',
    function ($routeProvider)
    {
      $routeProvider
        .when('/mainEvents/list', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'mainEvents-list.html',
          controller: 'mainEventsListCtrl'
        })
        .when('/mainEvents/thumbnail', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'mainEvents-thumbnail.html',
          controller: 'mainEventsListCtrl'
        })
        .when('/mainEvents/new', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'mainEvents-new.html',
          controller: 'mainEventsNewCtrl'
        })
        .when('/mainEvents/edit/:mainEventId', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'mainEvents-edit.html',
          controller: 'mainEventsEditCtrl'
        })
        .when('/mainEvents/show/:mainEventId', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'mainEvents-show.html',
          controller: 'mainEventsShowCtrl'
        })
        .otherwise({
          redirectTo: '/mainEvents/list'
        });
    }
  ]);