'use strict';

/**
 * Main Sympozer angular application router
 */
angular.module('sympozerApp').config(['$provide', '$routeProvider', function ($provide, $routeProvider)
{
    $routeProvider
        .when('/', {
            templateUrl: globalConfig.app.urls.partials + 'home/home.html',
            controller: 'mainCtrl'
        })
        .otherwise({
            /**
             * IF UNKNOWN ROUTE : redirection to the main page (see above)
             */
            redirectTo: '/'
        });

}]);

