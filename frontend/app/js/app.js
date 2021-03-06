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
angular.module('notificationsApp', []);
angular.module('messagesApp', []);
angular.module('topicsApp', []);
angular.module('teammatesApp', []);
angular.module('rolesApp', []);
angular.module('roleLabelsApp', []);
angular.module('categoriesApp', []);
angular.module('personsApp', []);
angular.module('analyticsApp', []);
angular.module('locationsApp', ['equipmentsApp']);
angular.module('equipmentsApp', []);
angular.module('eventsApp', ['categoriesApp']);
angular.module('mainEventsApp', ['socialsApp']);
angular.module('angularTranslateApp', ['pascalprecht.translate']);
angular.module('authenticationApp', ['ngCookies', 'personsApp']);
angular.module('socialsApp', []);
angular.module('positionsApp', []);
angular.module('importApp', []);
angular.module('angulartics', []);
angular.module('angulartics.google.analytics', []);

angular.module('contextualizationApp', ['mainEventsApp']).run(function (contextFact)
{
    //Initialize context factory with current mainEvent
    //@TODO: change .run function to contextualization app module
    contextFact.initContext();
});


/**
 * Main Sympozer Angular app depedencies
 */
var sympozerApp = angular.module('sympozerApp', [
    'validation.match',
    'toggle-switch',
    'ui.bootstrap',
    'ui.select2',
    'xeditable',
    'angularMoment',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
/** SYMPOZER APPS **/
    'pascalprecht.translate',
    'ngCachedResource',
    'authenticationApp',
    'importApp',
    'contextualizationApp',
    'i18nApp',
    'organizationsApp',
    'personsApp',
    'topicsApp',
    'locationsApp',
//    'equipmentsApp',
    'eventsApp',
    'teammatesApp',
    'rolesApp',
    'roleLabelsApp',
    'categoriesApp',
    'mainEventsApp',
    'papersApp',
    'messagesApp',
    'socialsApp',
    'notificationsApp',
    'analyticsApp',
    'angulartics',
    'angulartics.google.analytics',
    'flow',
    'positionsApp'
]);


/**
 * Configurations at run for xEditable live-edit plugin
 * (execute after injection)
 */
angular.module('sympozerApp').run(function (editableOptions, editableThemes)
{
    //Set bootstrap 3 theme
    editableOptions.theme = 'bs3';
    // overwrite submit button template
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';

    $("#page-content").css("min-height", window.innerHeight - $('header.navbar').height());
    $(window).resize(function ()
    {
        $("#page-content").css("min-height", window.innerHeight - $('header.navbar').height());
    });

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

    //Enable cors authentication (otherwise doesn't set session cookie)
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;

}]);



