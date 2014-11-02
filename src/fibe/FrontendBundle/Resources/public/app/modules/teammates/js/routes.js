/**
 * Teammates module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('teammatesApp')
    .config([
        '$routeProvider',
        function ($routeProvider)
        {
            $routeProvider
                .when('/conference/:mainEventId/teammates/list', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-list.html',
                    controller : 'teammatesListCtrl'
                })
                .when('/teammates/list', {
                    templateUrl: globalConfig.app.modules.teammates.urls.communityPartials + 'teammates-community-thumbnail.html',
                    controller : 'teammatesCommunityListCtrl'
                })
                .when('/conference/:mainEventId/teammates/thumbnail', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-thumbnail.html',
                    controller : 'teammatesListCtrl'
                })
                .when('/teammates/:personId/events', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-events.html',
                    controller : 'teammatesEventListCtrl'
                })

                .when('/teammates/thumbnail', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-thumbnail.html',
                    controller : 'teammatesListCtrl'
                })
                .when('/teammates/new', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-new.html',
                    controller : 'teammatesNewCtrl'
                })
                .when('/teammates/edit/:personId', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-edit.html',
                    controller : 'teammatesEditCtrl'
                })
                .when('/teammates/show/:personId', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-show.html',
                    controller : 'teammatesShowCtrl'
                })
                .otherwise({
                    redirectTo: '/teammates/list'
                });
        }
    ]);