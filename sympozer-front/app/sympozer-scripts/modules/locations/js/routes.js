/**
 * Location module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('locationsApp')
  .config(
  ['$routeProvider',
    function ($routeProvider)
    {
      $routeProvider
        .when('/home/conference/:mainEventId/locations/list', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'pages/locations-list.html',
          controller: 'locationsListCtrl'
        })
        .when('/home/conference/:mainEventId/locations/thumbnail', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-thumbnail.html',
          controller: 'locationsListCtrl'
        })
        .when('/home/conference/:mainEventId/locations/new', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'pages/locations-new.html',
          controller: 'locationsNewCtrl'
        })
        .when('/home/conference/:mainEventId/locations/edit/:locationId', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'pages/locations-edit.html',
          controller: 'locationsEditCtrl'
        })
        .when('/home/conference/:mainEventId/locations/show/:locationId', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'pages/locations-show.html',
          controller: 'locationsShowCtrl'
        })
        .otherwise({
          redirectTo: '/home/locations/list'
        });
    }
  ]);