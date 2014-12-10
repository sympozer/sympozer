/**
 * Roles module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('rolesApp')
    .config([
        '$routeProvider',
        function ($routeProvider)
        {
            $routeProvider
                .when('/home/roles/list', {
                    templateUrl: globalConfig.app.modules.roles.urls.partials + 'pages/roles-list.html',
                    controller : 'rolesListCtrl'
                })
                .when('/home/conference/:mainEventId/roles/list', {
                    templateUrl: globalConfig.app.modules.roles.urls.partials + 'pages/roles-list.html',
                    controller : 'rolesListCtrl'
                })
                .when('/home/conference/:mainEventId/roles/new', {
                    templateUrl: globalConfig.app.modules.roles.urls.partials + 'pages/roles-new.html',
                    controller : 'rolesNewCtrl'
                })
                .when('/home/conference/:mainEventId/roles/edit/:roleId', {
                    templateUrl: globalConfig.app.modules.roles.urls.partials + 'pages/roles-edit.html',
                    controller : 'rolesEditCtrl'
                })
                .when('/home/conference/:mainEventId/roles/show/:roleId', {
                    templateUrl: globalConfig.app.modules.roles.urls.partials + 'pages/roles-show.html',
                    controller : 'rolesShowCtrl'
                })
                .otherwise({
                    redirectTo: '/home/conference/:mainEventId/roles/list'
                });
        }
    ]);

angular.module('roleLabelsApp')
    .config([
        '$routeProvider',
        function ($routeProvider)
        {
            $routeProvider
                .when('/home/conference/:mainEventId/roleLabels/list', {
                    templateUrl: globalConfig.app.modules.roleLabels.urls.partials + 'pages/roleLabels-list.html',
                    controller : 'roleLabelsListCtrl'
                })
                .when('/home/conference/:mainEventId/roleLabels/thumbnail', {
                    templateUrl: globalConfig.app.modules.roleLabels.urls.partials + 'pages/roleLabels-thumbnail.html',
                    controller : 'roleLabelsListCtrl'
                })
                .when('/home/roleLabels/list', {
                    templateUrl: globalConfig.app.modules.roleLabels.urls.partials + 'pages/roleLabels-list.html',
                    controller : 'roleLabelsListCtrl'
                })
                .when('/home/roleLabels/thumbnail', {
                    templateUrl: globalConfig.app.modules.roleLabels.urls.partials + 'pages/roleLabels-thumbnail.html',
                    controller : 'roleLabelsListCtrl'
                })
                .when('/home/conference/:mainEventId/roleLabels/new', {
                    templateUrl: globalConfig.app.modules.roleLabels.urls.partials + 'pages/roleLabels-new.html',
                    controller : 'roleLabelsNewCtrl'
                })
                .when('/home/roleLabels/edit/:roleLabelId', {
                    templateUrl: globalConfig.app.modules.roleLabels.urls.partials + 'pages/roleLabels-edit.html',
                    controller : 'roleLabelsEditCtrl'
                })
                .when('/home/roleLabels/show/:roleLabelId', {
                    templateUrl: globalConfig.app.modules.roleLabels.urls.partials + 'pages/roleLabels-show.html',
                    controller : 'roleLabelsShowCtrl'
                })
                .otherwise({
                    redirectTo: '/home/roleLabels/list'
                });
        }
    ]);