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
                .when('/home/conference/:mainEventId/teammates', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'page/teammates-index.html',
                    controller : 'teammatesIndexCtrl'
                })
                .when('/home/conference/:mainEventId/teammates/new', {
                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'page/teammates-new.html',
                    controller : 'teammatesNewCtrl'
                })
//                .when('/teammates/list', {
//                    templateUrl: globalConfig.app.modules.teammates.urls.communityPartials + 'teammates-community-thumbnail.html',
//                    controller : 'teammatesCommunityListCtrl'
//                })
//                .when('/conference/:mainEventId/teammates/thumbnail', {
//                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-thumbnail.html',
//                    controller : 'teammatesListCtrl'
//                })
//                .when('/teammates/thumbnail', {
//                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-thumbnail.html',
//                    controller : 'teammatesListCtrl'
//                })
//                .when('/teammates/new', {
//                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-new.html',
//                    controller : 'teammatesNewCtrl'
//                })
//                .when('/teammates/edit/:teammateId', {
//                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-edit.html',
//                    controller : 'teammatesEditCtrl'
//                })
//                .when('/teammates/show/:teammateId', {
//                    templateUrl: globalConfig.app.modules.teammates.urls.partials + 'teammates-show.html',
//                    controller : 'teammatesShowCtrl'
//                })
//                .otherwise({
//                    redirectTo: '/teammates/list'
//                })
            ;
        }
    ]);