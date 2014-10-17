/**
 * Show conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'mainEventsFact', function ($scope, $rootScope, $routeParams, mainEventsFact)
{
    $scope.mainEvent = mainEventsFact.get({id: $routeParams.mainEventId});

    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});

}]);