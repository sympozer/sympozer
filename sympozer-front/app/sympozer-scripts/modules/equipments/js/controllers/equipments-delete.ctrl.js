/**
 * Delete equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsDeleteCtrl', [ '$scope', 'equipmentModel', function ($scope, equipmentModel)
{
    $scope.equipment = equipmentModel;
}]);
