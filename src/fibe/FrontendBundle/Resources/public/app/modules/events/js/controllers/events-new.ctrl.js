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
        $location.path('/conference/' + $routeParams.mainEventId + '/events/list');
    }

    $scope.create = function (form)
    {
        $scope.event.mainEvent = $routeParams.mainEventId;
        if (form.$valid)
        {
            $scope.event.$create({}, success, error);
        }
    }
}
]);