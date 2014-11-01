'use strict';

/**
 * Main angular app
 */

/**
 * Main app sub-modules
 */
angular.module('communityApp', []);
angular.module('organizationsApp', ['fundoo.services']);
angular.module('i18nApp', ['pascalprecht.translate']);
angular.module('papersApp', ['fundoo.services']);
angular.module('topicsApp', []);
angular.module('rolesApp', ['fundoo.services']);
angular.module('roleLabelsApp', ['fundoo.services']);
angular.module('categoriesApp', ['fundoo.services']);
angular.module('personsApp', ['fundoo.services']);
angular.module('locationsApp', ['fundoo.services', 'equipmentsApp']);
angular.module('equipmentsApp', ['fundoo.services']);
angular.module('eventsApp', ['fundoo.services', 'categoriesApp']);
angular.module('mainEventsApp', ['fundoo.services']);
angular.module('angularTranslateApp', ['pascalprecht.translate']);
angular.module('authenticationApp', ['ngCookies', 'personsApp']);
angular.module('contextualizationApp', ['mainEventsApp']);


/**
 * Main App Module
 *
 * @type {module}
 */
var sympozerApp = angular.module('sympozerApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.bootstrap.modal',
  'ngAnimate',
  'ngResource',
  'ngCookies',
  'ngDragDrop',
  'angular-loading-bar',
  'ngCachedResource',
  'sympozerFilters',
  'authenticationApp',
  'organizationsApp',
  'personsApp',
  'topicsApp',
  'locationsApp',
  'equipmentsApp',
  'eventsApp',
  'rolesApp',
  'roleLabelsApp',
  'categoriesApp',
  'mainEventsApp',
  'i18nApp',
  'contextualizationApp',
  'papersApp',
  'angularMoment',
  'leaflet-directive',
  'ui.bootstrap.datetimepicker',
  'ngSanitize',
  'ui.select',
  'xeditable',
  'colorpicker.module'
]);


/**
 * Main app run event
 *
 * (execute after injection)
 */
sympozerApp.run(function (editableOptions, editableThemes)
{
  editableOptions.theme = 'bs3';
  // overwrite submit button template
  editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
  editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';
});

/**
 * Authentication module configuration
 *
 * @type {config}
 */
angular.module('sympozerApp').config(['$provide', '$httpProvider',
  function ($provide, $httpProvider)
  {
    $httpProvider.interceptors.push('globalHttpInterceptor');

  }]);