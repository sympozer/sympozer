'use strict';

/**
 * Main angular app
 */

/**
 * Main app sub-modules
 */
angular.module('communityApp', []);
angular.module('organizationsApp', []);
angular.module('i18nApp', ['pascalprecht.translate']);
angular.module('papersApp', []);
angular.module('topicsApp', []);
angular.module('teammatesApp', []);
angular.module('rolesApp', []);
angular.module('roleLabelsApp', []);
angular.module('categoriesApp', []);
angular.module('personsApp', []);
angular.module('locationsApp', ['equipmentsApp']);
angular.module('equipmentsApp', []);
angular.module('eventsApp', ['categoriesApp']);
angular.module('mainEventsApp', []);
angular.module('angularTranslateApp', ['pascalprecht.translate']);
angular.module('authenticationApp', ['ngCookies', 'personsApp']);
angular.module('contextualizationApp', ['mainEventsApp']);


/**
 * Main App Module from SYMPOZER
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
    'angular-loading-bar',
    'ngCachedResource',

    'angularMoment',
    'leaflet-directive',
    'ui.bootstrap.datetimepicker',
    'ngSanitize',
    'ui.select',
    'xeditable',
    'colorpicker.module'
]);

/**
 * Main Sympozer Angular app depedencies
 */
sympozerApp = angular.module('sympozerApp', [
    'easypiechart',
    'toggle-switch',
    'ui.bootstrap',
    'ui.tree',
    'ui.select2',
    'ngGrid',
    'xeditable',
    'flow',
    'theme.services',
    'theme.directives',
    'theme.notifications-controller',
    'theme.messages-controller',
    'theme.colorpicker-controller',
    'theme.layout-horizontal',
    'theme.layout-boxed',
    'theme.vector_maps',
    'theme.google_maps',
    'theme.calendars',
    'theme.gallery',
    'theme.tasks',
    'theme.ui-tables-basic',
    'theme.ui-panels',
    'theme.ui-ratings',
    'theme.ui-modals',
    'theme.ui-tiles',
    'theme.ui-alerts',
    'theme.ui-sliders',
    'theme.ui-progressbars',
    'theme.ui-paginations',
    'theme.ui-carousel',
    'theme.ui-tabs',
    'theme.ui-nestable',
    'theme.form-components',
    'theme.form-directives',
    'theme.form-validation',
    'theme.form-inline',
    'theme.form-image-crop',
    'theme.form-uploads',
    'theme.tables-ng-grid',
    'theme.tables-editable',
    'theme.charts-flot',
    'theme.charts-canvas',
    'theme.charts-svg',
    'theme.charts-inline',
    'theme.pages-controllers',
    'theme.dashboard',
    'theme.templates',
    'theme.template-overrides',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
/** SYMPOZER APPS **/
//    'sympozer.breadcrumb-controller',
    'pascalprecht.translate',
    'ngCachedResource',
    'authenticationApp',
    'contextualizationApp',
    'i18nApp',

    'organizationsApp',
    'personsApp',
//    'topicsApp',
    'locationsApp',
//    'equipmentsApp',
//    'eventsApp',
    'teammatesApp',
//    'rolesApp',
//    'roleLabelsApp',
//    'categoriesApp',
    'mainEventsApp',
    'papersApp'
]);


/**
 * Configurations at run for xEditable live-edit plugin
 * (execute after injection)
 */
sympozerApp.run(function (editableOptions, editableThemes)
{
    editableOptions.theme = 'bs3';
    // overwrite submit button template
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
    editableThemes['bs3'].cancelTpl =  '<button type="button" class="btn btn-default" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';
});

/**
 * Authentication module configuration from SYMPOZER
 *
 * @type {config}
 */
angular.module('sympozerApp').config(['$provide', '$httpProvider', function ($provide, $httpProvider)
{
    //Add our custom interceptor on AJAX requests
    $httpProvider.interceptors.push('globalHttpInterceptor');
}]);

/**
 * Enable cors authentication (otherwise doesn't set session cookie)
 *
 * @type {config}
 */
angular.module('sympozerApp').config(['$httpProvider', function ($httpProvider)
{
    $httpProvider.defaults.withCredentials = true;
}]);


