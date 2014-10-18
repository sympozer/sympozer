/**
 * Edit conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'mainEventsFact', function ($scope, $rootScope, $routeParams, $location, mainEventsFact)
{
    $scope.mainEvent = mainEventsFact.get({id: $routeParams.mainEventId});


    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the field has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'field saved', type: 'success'});
    }

    $scope.updateMainEvent = function(field, data){
        var updateMainEvent = {id: $scope.mainEvent.id};
        updateMainEvent[field] = data;
        return mainEventsFact.patch(updateMainEvent, success, error);
    }

    $scope.onSelectStart = function(oldVal, newVal){
        $scope.updateMainEvent('startAt', newVal);
    }

    $scope.onSelectEnd = function(oldVal, newVal){
        $scope.updateMainEvent('endAt', newVal);
    }

    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});


}]);