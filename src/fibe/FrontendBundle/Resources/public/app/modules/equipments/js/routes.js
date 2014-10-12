/**
 * equipment module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('equipmentsApp')
  .config(
  ['$routeProvider',
    function ($routeProvider)
    {
      $routeProvider
        .when('/equipments/list', {
          templateUrl: globalConfig.app.modules.equipments.urls.partials + 'equipments-list.html',
          controller: 'equipmentsListCtrl'
        })
        .when('/equipments/thumbnail', {
          templateUrl: globalConfig.app.modules.equipments.urls.partials + 'equipments-thumbnail.html',
          controller: 'equipmentsListCtrl'
        })
        .when('/equipments/new', {
          templateUrl: globalConfig.app.modules.equipments.urls.partials + 'equipments-new.html',
          controller: 'equipmentsNewCtrl'
        })
        .when('/equipments/edit/:equipmentId', {
          templateUrl: globalConfig.app.modules.equipments.urls.partials + 'equipments-edit.html',
          controller: 'equipmentsEditCtrl'
        })
        .when('/equipments/show/:equipmentId', {
          templateUrl: globalConfig.app.modules.equipments.urls.partials + 'equipments-show.html',
          controller: 'equipmentsShowCtrl'
        })
        .otherwise({
          redirectTo: '/equipments/list'
        });
    }
  ]);