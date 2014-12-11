/**
 * List equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsListCtrl', ['$scope', 'GLOBAL_CONFIG', '$rootScope', 'equipmentsFact', '$cachedResource', '$routeParams', function ($scope, GLOBAL_CONFIG, $rootScope, equipmentsFact, $cachedResource, $routeParams)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $scope.entities = [];

    var baseFilters;
    if ($routeParams.mainEventId)
    {
        $scope.filters = baseFilters = {
            mainEventId: $routeParams.mainEventId
        };
    }

    $scope.reload = function ()
    {
        $scope.entities.$promise.then(function ()
        {
            console.log('From cache:', $scope.equipments);
        });
    }

    $scope.clone = function (equipment)
    {
        var cloneequipment = angular.copy(equipment);
        delete cloneequipment.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'equipment saved', type: 'success'});
            $scope.entities.push(response);
        }

        cloneequipment.$create({}, success, error);
    }


//    $scope.deleteModal = function (index, equipment)
//    {
//        $scope.index = index;
//
//        createDialogService(GLOBAL_CONFIG.app.modules.equipments.urls.partials + 'equipments-delete.html', {
//            id: 'complexDialog',
//            title: 'equipment deletion',
//            backdrop: true,
//            controller: 'equipmentsDeleteCtrl',
//            success: {label: 'Ok', fn: function ()
//            {
//                equipmentsFact.delete({id: equipment.id});
//                $scope.entities.splice(index, 1);
//            }}
//        }, {
//            equipmentModel: equipment
//        });
//    }
}]);
