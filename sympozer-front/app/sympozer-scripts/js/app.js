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
angular.module('teammatesApp', ['fundoo.services']);
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
var sympozerApp = angular.module('sympozerApp', [
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
/** SYMPOZER GLOBAL CONTROLLERS **/
//    'sympozer.breadcrumb-controller',
    'authenticationApp',
    'contextualizationApp',
//    'organizationsApp',
//    'personsApp',
//    'topicsApp',
//    'locationsApp',
//    'equipmentsApp',
//    'eventsApp',
//    'teammatesApp',
//    'rolesApp',
//    'roleLabelsApp',
//    'categoriesApp',
//    'mainEventsApp',
//    'i18nApp',
//    'papersApp',
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
 * Main Sympozer Angular app controller from FORZA
 */
sympozerApp.controller('MainController', ['$scope', '$rootScope', '$global', '$timeout', 'progressLoader', '$location', function ($scope, $rootScope, $global, $timeout, progressLoader, $location)
{
    /**
     * Getting main html attribute configurations
     */
    $rootScope.style_fixedHeader = $global.get('fixedHeader');
    $rootScope.style_headerBarHidden = $global.get('headerBarHidden');
    $rootScope.style_layoutBoxed = $global.get('layoutBoxed');
    $rootScope.style_fullscreen = $global.get('fullscreen');
    $rootScope.style_leftbarCollapsed = $global.get('leftbarCollapsed');
    $rootScope.style_leftbarShown = $global.get('leftbarShown');
    $rootScope.style_rightbarCollapsed = $global.get('rightbarCollapsed');
    $rootScope.style_isSmallScreen = false;
    $rootScope.style_showSearchCollapsed = $global.get('showSearchCollapsed');
    $rootScope.style_layoutHorizontal = $global.get('layoutHorizontal');





    /**
     * Event triggered whenever a global change of layout append
     * (usually when the user click somewhere on the app)
     */
    $scope.$on('globalStyles:changed', function (event, newVal)
    {
        $scope['style_' + newVal.key] = newVal.value;
    });
    $scope.$on('globalStyles:maxWidth767', function (event, newVal)
    {
        $timeout(function ()
        {
            $scope.style_isSmallScreen = newVal;
            if (!newVal)
            {
                $global.set('leftbarShown', false);
            }
            else
            {
                $global.set('leftbarCollapsed', false);
            }
        });
    });


    // there are better ways to do this, e.g. using a dedicated service
    // but for the purposes of this demo this will do :P
    $scope.isContextMainEvent = true;
    $scope.setContextMainEventOn = function ()
    {
        $scope.isContextMainEvent = true;
    };
    $scope.setContextMainEventOff = function ()
    {
        $scope.isContextConference = false;
    };


    /**
     * Specify if the right accordeon show only one element at a time of severals
     * @type {boolean}
     */
    $scope.rightbarAccordionsShowOne = false;
    /**
     * Specify wich accordeons have to be open when the page is loaded
     * @type {{open: boolean}[]}
     */
    $scope.rightbarAccordions = [
        {open: true},
        {open: true},
        {open: true},
        {open: true},
        {open: true},
        {open: true},
        {open: true}
    ];

    /**
     * Progress Bar configuration
     */
    $scope.$on('$routeChangeStart', function (e)
    {
        // console.log('start: ', $location.path());
        progressLoader.start();
        progressLoader.set(50);
    });
    $scope.$on('$routeChangeSuccess', function (e)
    {
        // console.log('success: ', $location.path());
        progressLoader.end();
    });
}]);
