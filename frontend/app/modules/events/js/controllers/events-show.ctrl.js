/**
 * Show event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsShowCtrl', [ '$scope', '$routeParams', 'eventsFact', function ($scope, $routeParams, eventsFact)
{
    $scope.event = eventsFact.get({id: $routeParams.eventId});

}]);
