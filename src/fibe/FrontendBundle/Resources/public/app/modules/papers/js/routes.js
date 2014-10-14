/**
 * Paper module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('papersApp')
    .config([
        '$routeProvider',
        function ($routeProvider)
        {
            $routeProvider
                .when('/papers/list', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-list.html',
                    controller : 'papersListCtrl'
                })
                .when('/papers/thumbnail', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-thumbnail.html',
                    controller : 'papersListCtrl'
                })
                .when('/conference/:mainEventId/papers/list', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-list.html',
                    controller : 'papersListCtrl'
                })
                .when('/conference/:mainEventId/papers/thumbnail', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-thumbnail.html',
                    controller : 'papersListCtrl'
                })
                .when('/conference/:mainEventId/papers/new', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-new.html',
                    controller : 'papersNewCtrl'
                })
                .when('/conference/:mainEventId/papers/edit/:paperId', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-edit.html',
                    controller : 'papersEditCtrl'
                })
                .when('/conference/:mainEventId/papers/show/:paperId', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-show.html',
                    controller : 'papersShowCtrl'
                })
                .otherwise({
                    redirectTo: '/conference/:mainEventId/papers/list'
                });
        }
    ]);