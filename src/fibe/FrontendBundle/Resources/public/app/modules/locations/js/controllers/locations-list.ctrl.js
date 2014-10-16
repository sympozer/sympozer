

/**
 * List location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'locationsFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, locationsFact, $cachedResource)
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
            console.log('From cache:', $scope.entities);
        });
    }

    $scope.clone = function (location)
    {
        var clonelocation = angular.copy(location);
        delete clonelocation.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'location saved', type: 'success'});
            $scope.entities.push(response);
        }

        clonelocation.$create({}, success, error);
    }


    $scope.deleteModal = function (index, location)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.locations.urls.partials + 'locations-delete.html', {
            id: 'complexDialog',
            title: 'Location deletion',
            backdrop: true,
            controller: 'locationsDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                locationsFact.delete({id: location.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            locationModel: location
        });
    }

}]);