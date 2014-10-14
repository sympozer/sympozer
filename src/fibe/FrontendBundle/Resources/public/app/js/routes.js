'use strict';

/**
 * Main app module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
sympozerApp.config(['$routeProvider',
    function ($routeProvider)
    {
        $routeProvider.
            when('/dashboard/overview', {
                templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-overview.html',
                controller: 'dashboardCtrl'
            }).
            when('/dashboard/schedule', {
                templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-schedule.html',
                controller: 'dashboardCtrl'
            }).
            when('/dashboard/myspace', {
                templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-myspace.html',
                controller: 'dashboardCtrl'
            }).
            when('/dashboard/widget', {
                templateUrl: globalConfig.app.urls.partials + 'dashboards/dashboard-widget.html',
                controller: 'dashboardCtrl'
            }).
            when('/', {
                templateUrl: globalConfig.app.urls.partials + 'home/home.html',
                controller: 'homeCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);
