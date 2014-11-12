/**
 * Delete event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsDeleteCtrl', [ '$scope', 'eventModel', function ($scope, eventModel)
{
    $scope.event = eventModel;
}]);

