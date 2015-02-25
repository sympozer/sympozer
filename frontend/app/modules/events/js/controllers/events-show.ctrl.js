/**
 * Show event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsShowCtrl', [ '$scope', '$routeParams', 'eventsFact', 'moment', function ($scope, $routeParams, eventsFact, moment)
{
    $scope.event = eventsFact.get({id: $routeParams.eventId}, function(){
        if($scope.event.startAt && $scope.event.location){
            //Calculate difference between start and end
            var eventDuration = moment.duration(new moment($scope.event.endAt) - new moment($scope.event.startAt));
            //Create an understanable string to express the duration
            $scope.event.duration = eventDuration.humanize();
        }
    });


}]);
