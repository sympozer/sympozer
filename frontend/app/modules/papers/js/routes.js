/**
 * Paper module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('papersApp').config([ '$routeProvider', function ($routeProvider)
{
    $routeProvider
        .when('/home/papers/index', {
            templateUrl: globalConfig.app.modules.papers.urls.partials + 'pages/papers-index.html',
            controller: 'papersCommunityListCtrl'
        })
        .when('/home/papers/list', {
            templateUrl: globalConfig.app.modules.papers.urls.communityPartials + 'papers-community-thumb.html',
            controller: 'papersCommunityListCtrl'
        })
        .when('/home/papers/thumbnail', {
            templateUrl: globalConfig.app.modules.papers.urls.partials + 'pages/papers-thumbnail.html',
            controller: 'papersListCtrl'
        })
        .when('/home/conference/:mainEventId/papers/list', {
            templateUrl: globalConfig.app.modules.papers.urls.partials + 'pages/papers-list.html',
            controller: 'papersListCtrl'
        })
        .when('/home/conference/:mainEventId/papers/thumbnail', {
            templateUrl: globalConfig.app.modules.papers.urls.partials + 'pages/papers-thumbnail.html',
            controller: 'papersListCtrl'
        })
        .when('/home/conference/:mainEventId/papers/new', {
            templateUrl: globalConfig.app.modules.papers.urls.partials + 'pages/papers-new.html',
            controller: 'papersNewCtrl'
        })
        .when('/home/conference/:mainEventId/papers/edit/:paperId', {
            templateUrl: globalConfig.app.modules.papers.urls.partials + 'pages/papers-edit.html',
            controller: 'papersEditCtrl'
        })
        .when('/home/conference/:mainEventId/papers/show/:paperId', {
            templateUrl: globalConfig.app.modules.papers.urls.partials + 'pages/papers-show.html',
            controller: 'papersShowCtrl'
        })
        .otherwise({
            redirectTo: '/home/papers/index'
        });
}
]);
