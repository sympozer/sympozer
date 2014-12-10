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
          templateUrl: globalConfig.app.modules.mainEvents.urls.partialsCommunity + 'main-events-community-thumbnail.html',
          controller: 'mainEventsCommunityListCtrl'
        })
        .when('/mainEvents/thumbnail', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'main-events-thumbnail.html',
          controller: 'mainEventsListCtrl'
        })
        .when('/mainEvents/new', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'main-events-new.html',
          controller: 'mainEventsNewCtrl'
        })
        .when('/mainEvents/edit/:mainEventId', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'main-events-edit.html',
          controller: 'mainEventsEditCtrl'
        })
        .when('/mainEvents/show/:mainEventId', {
          templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'main-events-show.html',
          controller: 'mainEventsShowCtrl'
        })
        .otherwise({
          redirectTo: '/mainEvents/list'
        });
    }
  ]);