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
                .when('/conference/:confId/categories/list', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-list.html',
                    controller : 'categoriesListCtrl'
                })
                .when('/conference/:confId/categories/thumbnail', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-thumbnail.html',
                    controller : 'categoriesListCtrl'
                })
                .when('/conference/:confId/categories/new', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-new.html',
                    controller : 'categoriesNewCtrl'
                })
                .when('/conference/:confId/categories/edit/:categoryId', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-edit.html',
                    controller : 'categoriesEditCtrl'
                })
                .when('/conference/:confId/categories/show/:categoryId', {
                    templateUrl: globalConfig.app.modules.categories.urls.partials + 'categories-show.html',
                    controller : 'categoriesShowCtrl'
                })
                .otherwise({
                    redirectTo: '/categories/list'
                });
        }
    ]);