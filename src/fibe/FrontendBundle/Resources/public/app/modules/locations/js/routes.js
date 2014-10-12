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
        .when('/conference/:confId/locations/list', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-list.html',
          controller: 'locationsListCtrl'
        })
        .when('/conference/:confId/locations/thumbnail', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-thumbnail.html',
          controller: 'locationsListCtrl'
        })
        .when('/conference/:confId/locations/new', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-new.html',
          controller: 'locationsNewCtrl'
        })
        .when('/conference/:confId/locations/edit/:locationId', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-edit.html',
          controller: 'locationsEditCtrl'
        })
        .when('/conference/:confId/locations/show/:locationId', {
          templateUrl: globalConfig.app.modules.locations.urls.partials + 'locations-show.html',
          controller: 'locationsShowCtrl'
        })
        .otherwise({
          redirectTo: '/locations/list'
        });
    }
  ]);