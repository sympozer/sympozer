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
                .when('/conference/:confId/papers/list', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-list.html',
                    controller : 'papersListCtrl'
                })
                .when('/conference/:confId/papers/thumbnail', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-thumbnail.html',
                    controller : 'papersListCtrl'
                })
                .when('/conference/:confId/papers/new', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-new.html',
                    controller : 'papersNewCtrl'
                })
                .when('/conference/:confId/papers/edit/:paperId', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-edit.html',
                    controller : 'papersEditCtrl'
                })
                .when('/conference/:confId/papers/show/:paperId', {
                    templateUrl: globalConfig.app.modules.papers.urls.partials + 'papers-show.html',
                    controller : 'papersShowCtrl'
                })
                .otherwise({
                    redirectTo: '/conference/:confId/papers/list'
                });
        }
    ]);