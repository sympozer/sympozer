/**
 * equipment controllers
 */

/**
 * Main equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsMainCtrl', [function ($scope)
{

}]);

/**
 * List equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsListCtrl', ['$scope', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'equipmentsFact', '$cachedResource', function ($scope, GLOBAL_CONFIG, createDialogService, $rootScope, equipmentsFact, $cachedResource)
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


    $scope.deleteModal = function (index, equipment)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.equipments.urls.partials + 'equipments-delete.html', {
            id: 'complexDialog',
            title: 'equipment deletion',
            backdrop: true,
            controller: 'equipmentsDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                equipmentsFact.delete({id: equipment.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            equipmentModel: equipment
        });
    }
}]);


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
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the equipment has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'equipment created', type: 'success'});
    }

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.equipment.$create({}, success, error);
        }
    }
}]);

/**
 * Edit equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'equipmentsFact', function ($scope, $rootScope, $routeParams, $location, equipmentsFact)
{
    $scope.equipment = equipmentsFact.get({id: $routeParams.equipmentId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the equipment has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'equipment saved', type: 'success'});
        $location.path('/equipments/list');
    }

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.equipment.$update({}, success, error);
        }
    }
}]);

/**
 * Show equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsShowCtrl', [ '$scope', '$routeParams', 'equipmentsFact', function ($scope, $routeParams, equipmentsFact)
{
    $scope.equipment = equipmentsFact.get({id: $routeParams.equipmentId});

}]);

/**
 * Delete equipment controller
 *
 * @type {controller}
 */
angular.module('equipmentsApp').controller('equipmentsDeleteCtrl', [ '$scope', 'equipmentModel', function ($scope, equipmentModel)
{
    $scope.equipment = equipmentModel;
}]);

