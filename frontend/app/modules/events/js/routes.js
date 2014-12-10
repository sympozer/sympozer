/**
 * Events module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('eventsApp')
    .config([
        '$routeProvider',
        function ($routeProvider)
        {
            $routeProvider
                .when('/home/events/list', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-list.html',
                    controller : 'eventsListCtrl'
                })
                .when('/home/events/thumbnail', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-thumbnail.html',
                    controller : 'eventsListCtrl'
                })
                .when('/home/events/schedule', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-schedule.html',
                    controller : 'eventsScheduleCtrl'
                })
                .when('/home/conference/:mainEventId/events/list', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-list.html',
                    controller : 'eventsListCtrl'
                })
                .when('/home/conference/:mainEventId/events/thumbnail', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-thumbnail.html',
                    controller : 'eventsListCtrl'
                })
                .when('/home/conference/:mainEventId/events/schedule', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-schedule.html',
                    controller : 'eventsScheduleCtrl'
                })
                .when('/home/conference/:mainEventId/events/new', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-new.html',
                    controller : 'eventsNewCtrl'
                })
                .when('/home/conference/:mainEventId/events/edit/:eventId', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-edit.html',
                    controller : 'eventsEditCtrl'
                })
                .when('/home/conference/:mainEventId/events/show/:eventId', {
                    templateUrl: globalConfig.app.modules.events.urls.partials + 'pages/events-show.html',
                    controller : 'eventsShowCtrl'
                })
                .otherwise({
                    redirectTo: '/home/events/list'
                });
        }
    ]);