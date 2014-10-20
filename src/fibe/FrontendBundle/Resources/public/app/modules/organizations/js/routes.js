/**
 * Organizations module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('organizationsApp')
    .config([
        '$routeProvider',
        function ($routeProvider)
        {
            $routeProvider
                .when('/organizations/list', {
                    templateUrl: globalConfig.app.modules.organizations.urls.communityPartials + 'organizations-community-thumbnail.html',
                    controller : 'organizationsCommunityListCtrl'
                })
                .when('/organizations/thumbnail', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'organizations-thumbnail.html',
                    controller : 'organizationsListCtrl'
                })
                .when('/conference/:mainEventId/organizations/list', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'organizations-list.html',
                    controller : 'organizationsListCtrl'
                })
                .when('/conference/:mainEventId/organizations/thumbnail', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'organizations-thumbnail.html',
                    controller : 'organizationsListCtrl'
                })
                .when('/organizations/new', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'organizations-new.html',
                    controller : 'organizationsNewCtrl'
                })
                .when('/organizations/edit/:organizationId', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'organizations-edit.html',
                    controller : 'organizationsEditCtrl'
                })
                .when('/organizations/show/:organizationId', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'organizations-show.html',
                    controller : 'organizationsShowCtrl'
                })
                .otherwise({
                    redirectTo: '/organizations/list'
                });
        }
    ]);