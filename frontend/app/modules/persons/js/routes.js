/**
 * Persons module configuration
 * route <--> template <--> controller
 *
 * @type {config}
 */
angular.module('personsApp').config([ '$routeProvider', function ($routeProvider)
{
    $routeProvider
        .when('/home/persons/index', {
            templateUrl: globalConfig.app.modules.persons.urls.partials + 'pages/persons-index.html',
            controller : 'personsCommunityIndexCtrl'
        })
        .when('/home/conference/:mainEventId/persons/list', {
            templateUrl: globalConfig.app.modules.persons.urls.partials + 'pages/persons-list.html',
            controller : 'personsListCtrl'
        })
        .when('/home/conference/:mainEventId/persons/thumbnail', {
            templateUrl: globalConfig.app.modules.persons.urls.partials + 'pages/persons-thumbnail.html',
            controller : 'personsListCtrl'
        })
        .when('/home/persons/:personId/events', {
            templateUrl: globalConfig.app.modules.persons.urls.partials + 'pages/persons-events.html',
            controller : 'personsEventListCtrl'
        })

        .when('/home/persons/thumbnail', {
            templateUrl: globalConfig.app.modules.persons.urls.partials + 'views/persons-thumbnail.html',
            controller : 'personsListCtrl'
        })
        .when('/home/persons/new', {
            templateUrl: globalConfig.app.modules.persons.urls.partials + 'pages/persons-new.html',
            controller : 'personsNewCtrl'
        })
        .when('/home/persons/edit/:personId', {
            templateUrl: globalConfig.app.modules.persons.urls.partials + 'pages/persons-edit.html',
            controller : 'personsEditCtrl'
        })
        .when('/home/persons/show/:personId', {
            templateUrl: globalConfig.app.modules.persons.urls.partials + 'pages/persons-show.html',
            controller : 'personsShowCtrl'
        })
        .otherwise({
            redirectTo: '/persons/list'
        });
}
]);