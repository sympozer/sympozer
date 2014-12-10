/**
 * Category module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('categoriesApp')
    .config([
        '$routeProvider',
        function ($routeProvider)
        {
            $routeProvider
                .when('/home/conference/:mainEventId/categories/list', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'pages/categories-list.html',
                    controller : 'categoriesListCtrl'
                })
                .when('/home/conference/:mainEventId/categories/thumbnail', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'pages/categories-thumbnail.html',
                    controller : 'categoriesListCtrl'
                })
                .when('/home/conference/:mainEventId/categories/new', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'pages/categories-new.html',
                    controller : 'categoriesNewCtrl'
                })
                .when('/home/conference/:mainEventId/categories/edit/:categoryId', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'pages/categories-edit.html',
                    controller : 'categoriesEditCtrl'
                })
                .when('/home/conference/:mainEventId/categories/show/:categoryId', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'pages/categories-show.html',
                    controller : 'categoriesShowCtrl'
                })
                .otherwise({
                    redirectTo: '/home/categories/list'
                });
        }
    ]);