/**
 * Conference module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('mainEventsApp')
    .config(
    ['$routeProvider',
        function ($routeProvider)
        {
            $routeProvider
                .when('/home/mainEvents/index', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'pages/main-events-index.html',
                    controller: 'mainEventsCommunityIndexCtrl'
                })
                .when('/home/mainEvents/:mainEventId/overview/settings', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'pages/main-events-show.html',
                    controller: 'mainEventsShowCtrl'
                })
                .when('/home/mainEvents/show/:mainEventId', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'pages/main-events-show.html',
                    controller: 'mainEventsShowCtrl'
                })
                .when('/home/mainEvents/thumbnail', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'pages/main-events-thumbnail.html',
                    controller: 'mainEventsListCtrl'
                })
                .when('/home/mainEvents/new', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'pages/main-events-new.html',
                    controller: 'mainEventsNewCtrl'
                })
                .when('/home/mainEvents/edit/:mainEventId', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'pages/main-events-edit.html',
                    controller: 'mainEventsEditCtrl'
                })
                .otherwise({
                    redirectTo: '/mainEvents/index'
                });
        }
    ]);