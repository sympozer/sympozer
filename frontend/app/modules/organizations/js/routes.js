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
                .when('/home/organizations/index', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'pages/organizations-index.html',
                    controller : 'organizationsCommunityIndexCtrl'
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
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'pages/organizations-new.html',
                    controller : 'organizationsNewCtrl'
                })
                .when('/home/organizations/edit/:organizationId', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'pages/organizations-edit.html',
                    controller : 'organizationsEditCtrl'
                })
                .when('/home/organizations/show/:organizationId', {
                    templateUrl: globalConfig.app.modules.organizations.urls.partials + 'pages/organizations-show.html',
                    controller : 'organizationsShowCtrl'
                })
                .otherwise({
                    redirectTo: '/organizations/list'
                });
        }
    ]);