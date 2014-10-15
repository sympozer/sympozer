
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
        $location.path('/conference/' + $rootScope.currentMainEvent.id + '/events/list');
    }

    $scope.update = function (form)
    {
        //$scope.event.mainEvent = $rootScope.currentMainEvent;
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
