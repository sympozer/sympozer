/**
 * New equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsNewCtrl', [ '$scope', '$rootScope', '$location', 'equipmentsFact', function ($scope, $rootScope, $location, equipmentsFact)
{
    $scope.equipment = new equipmentsFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'equipments.validations.not_created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'equipments.validations.created', type: 'success'});
    }

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.equipment.$create({}, success, error);
        }
    }
}]);