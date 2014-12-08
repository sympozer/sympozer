/**
 * Events module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('notificationsApp').config([ '$routeProvider', function ($routeProvider)
{
    $routeProvider
        .when('/notifications', {
            templateUrl: globalConfig.app.modules.notifications.urls.partials + 'pages/notifications-list.html',
            controller : 'notificationsListCtrl'
        })
        .otherwise({
            redirectTo: '/notifications'
        });
}
]);