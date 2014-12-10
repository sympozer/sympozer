/**
 * Events module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('analyticsApp').config([ '$routeProvider', function ($routeProvider)
{
    $routeProvider
        .when('/home/conference/:mainEventId/analytics/index', {
            templateUrl: globalConfig.app.modules.analytics.urls.partials + 'pages/analytics-index.html',
            controller : 'analyticsIndexCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}
]);