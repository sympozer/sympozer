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
                .when('/categories/list', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-list.html',
                    controller : 'categoriesListCtrl'
                })
                .when('/categories/thumbnail', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-thumbnail.html',
                    controller : 'categoriesListCtrl'
                })
                .when('/conference/:mainEventId/categories/list', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-list.html',
                    controller : 'categoriesListCtrl'
                })
                .when('/conference/:mainEventId/categories/thumbnail', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-thumbnail.html',
                    controller : 'categoriesListCtrl'
                })
                .when('/conference/:mainEventId/categories/new', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-new.html',
                    controller : 'categoriesNewCtrl'
                })
                .when('/conference/:mainEventId/categories/edit/:categoryId', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-edit.html',
                    controller : 'categoriesEditCtrl'
                })
                .when('/conference/:mainEventId/categories/show/:categoryId', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-show.html',
                    controller : 'categoriesShowCtrl'
                })
                .otherwise({
                    redirectTo: '/categories/list'
                });
        }
    ]);