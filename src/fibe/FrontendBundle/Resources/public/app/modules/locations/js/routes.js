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
        .when('/conference/:mainEventId/locations/list', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-list.html',
          controller: 'locationsListCtrl'
        })
        .when('/conference/:mainEventId/locations/thumbnail', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-thumbnail.html',
          controller: 'locationsListCtrl'
        })
        .when('/conference/:mainEventId/locations/new', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-new.html',
          controller: 'locationsNewCtrl'
        })
        .when('/conference/:mainEventId/locations/edit/:locationId', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-edit.html',
          controller: 'locationsEditCtrl'
        })
        .when('/conference/:mainEventId/locations/show/:locationId', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-show.html',
          controller: 'locationsShowCtrl'
        })
        .otherwise({
          redirectTo: '/locations/list'
        });
    }
  ]);