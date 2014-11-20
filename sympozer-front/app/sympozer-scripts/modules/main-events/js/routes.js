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
                .when('/home/mainEvents/:mainEventId/overview/settings', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'main-events-show.html',
                    controller: 'mainEventsShowCtrl'
                })
                .when('/home/mainEvents/list', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partialsCommunity + 'main-events-community-thumbnail.html',
                    controller: 'mainEventsCommunityListCtrl'
                })
                .when('/home/mainEvents/thumbnail', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'main-events-thumbnail.html',
                    controller: 'mainEventsListCtrl'
                })
                .when('/home/mainEvents/new', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'main-events-new.html',
                    controller: 'mainEventsNewCtrl'
                })
                .when('/home/mainEvents/edit/:mainEventId', {
                    templateUrl: globalConfig.app.modules.mainEvents.urls.partials + 'main-events-edit.html',
                    controller: 'mainEventsEditCtrl'
                })

                .otherwise({
                    redirectTo: '/mainEvents/index'
                });
        }
    ]);