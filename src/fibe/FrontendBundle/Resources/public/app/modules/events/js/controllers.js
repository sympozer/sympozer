/**
 * Events Controllers
 */

/**
 * Main events controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsMainCtrl',
    [function ($scope)
     {

     }]);


/**
 * List events controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsListCtrl', ['$scope', 'categoriesFact', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'eventsFact', '$cachedResource', function ($scope, categoriesFact, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, eventsFact, $cachedResource)
{

    //Context change
    //$rootScope.$broadcast('contextCtrl:changeContext', {confId:$routeParams.confId});

    $scope.entities = [];
    $scope.categories = categoriesFact.all({'filters[mainEventId]': $routeParams.confId});

    var baseFilters;
    if ($routeParams.confId)
    {
        $scope.filters = baseFilters = {
            mainEventId: $routeParams.confId
        };
    }


    $scope.reload = function ()
    {
        $scope.events.$promise.then(function ()
        {
            console.log('From cache:', $scope.events);
        });
    }

    $scope.clone = function (event, index)
    {

        var cloneEvent = angular.copy(event);
        delete cloneEvent.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Event saved', type: 'success'});
            $scope.entities.splice(index + 1, 0, response);
        }

        cloneEvent.$create({}, success, error);
    }

    $scope.deleteModal = function (index, event)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.events.urls.partials + 'events-delete.html', {
            id        : 'complexDialog',
            title     : 'Event deletion',
            backdrop  : true,
            controller: 'eventsDeleteCtrl',
            success   : {label: 'Ok', fn: function ()
            {
                eventsFact.delete({id: event.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            eventModel: event
        });
    }

}]);

/**
 * New event controller
 *
 * @type {controller}
 */

angular.module('eventsApp').controller('eventsNewCtrl', [ '$scope', '$routeParams', '$rootScope', '$location', 'eventsFact', function ($scope, $routeParams, $rootScope, $location, eventsFact)
{
    $scope.event = new eventsFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the event has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'event created', type: 'success'});
        $location.path('/conference/' + $routeParams.confId + '/events/list');
    }

    $scope.create = function (form)
    {
        $scope.event.mainEvent = $routeParams.confId;
        if (form.$valid)
        {
            $scope.event.$create({}, success, error);
        }
    }
}
]);

/**
 * Edit event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsEditCtrl', [ '$scope', '$rootScope', 'GLOBAL_CONFIG', '$routeParams', '$location', 'eventsFact', 'createDialog', function ($scope, $rootScope, GLOBAL_CONFIG, $routeParams, $location, eventsFact, createDialogService)
{
    $scope.event = eventsFact.get({id: $routeParams.eventId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the event has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'event saved', type: 'success'});
        $location.path('/conference/' + $rootScope.currentConference.id + '/events/list');
    }

    $scope.update = function (form)
    {
        //$scope.event.mainEvent = $rootScope.currentConference;
        if (form.$valid)
        {
            $scope.event.$update({}, success, error);
        }
    }

    $scope.createLocationModal = function ()
    {
        createDialogService(GLOBAL_CONFIG.app.modules.locations.urls.partials + 'locations-new.html', {
            id        : 'complexDialog',
            title     : 'New location',
            backdrop  : true,
            controller: 'locationsNewCtrl',
            success   : {label: 'Save', fn: function ()
            {
            }}
        }, {
        });
    }

    $scope.addLocation = function (index, location)
    {
        $scope.event.locations.push(location);
    }

    $scope.deleteLocation = function (index)
    {
        $scope.event.locations.slice(index, 1);
    }

}]);

/**
 * Show event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsShowCtrl', [ '$scope', '$routeParams', 'eventsFact', function ($scope, $routeParams, eventsFact)
{
    $scope.event = eventsFact.get({id: $routeParams.eventId});

}]);

/**
 * Delete event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsDeleteCtrl', [ '$scope', 'eventModel', function ($scope, eventModel)
{
    $scope.event = eventModel;
}]);

