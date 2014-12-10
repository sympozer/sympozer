/**
 * Show equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsShowCtrl', [ '$scope', '$routeParams', 'equipmentsFact', function ($scope, $routeParams, equipmentsFact)
{
    $scope.equipment = equipmentsFact.get({id: $routeParams.equipmentId});

}]);