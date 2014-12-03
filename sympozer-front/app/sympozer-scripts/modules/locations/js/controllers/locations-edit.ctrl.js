
/**
 * Edit location controller
 * @TODO implement a directive for the map handling to remove code duplication
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsEditCtrl', [ '$scope', '$window', '$filter', '$rootScope', '$routeParams', '$location','equipmentsFact', 'locationsFact', 'pinesNotifications', 'translateFilter',
    function ($scope, $window, $filter, $rootScope, $routeParams, $location, equipmentsFact, locationsFact, pinesNotifications, translateFilter)
{

    $scope.location = locationsFact.get({id: $routeParams.locationId}, function(location){
        //initialize map with current location
        $scope.mapInstanceOption.lat = location.latitude || 48;
        $scope.mapInstanceOption.long = location.longitude || 8;
        $scope.mapInstanceOption.zoom = 4;
    });


    var error = function (response, args)
    {
        //Notify of error on delete request
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text: translateFilter('locations.validations.not_created'),
            type: 'error'
        });
    };

    var success = function (response, args)
    {
        //Notify of error on delete request
        pinesNotifications.notify({
            title: translateFilter('global.validations.success'),
            text: translateFilter('locations.validations.created'),
            type: 'success'
        });

        $window.history.back();
    };

    $scope.save = function (form)
    {
        if (form.$valid)
        {
            locationsFact.update(locationsFact.serialize($scope.location), success, error);
        }
    };

    //Populate array of a specific linked entity
    $scope.addRelationship = function(key, model){
        //Check if array available for the linked entity
        if(!$scope.location[key]){
            $scope.location[key] = [];
        }

        //Stop if the object selected is already in array (avoid duplicates)
        if(! $filter('inArray')('id', model.id, $scope.location[key])){
            //If no duplicate add the selected object to the specified array
            $scope.location[key].push(model);
        };
    }


    //Autocomplete and add equipment workflow
    $scope.searchEquipments = equipmentsFact.all;
    $scope.addEquipment = function (equipmentModel)
    {
        $scope.addRelationship('equipments',equipmentModel)
    };



    $scope.deleteEquipment= function(index){
        $scope.location.equipments.splice(index, 1);
    };

    //Mandatory for the map plugin gmap to work
    $scope.geoCodingMapInstance;

    //Bind new map instance from plugin to scope
    $scope.$on('GMaps:created', function (event, mapInstance) {
        if (mapInstance.key) {
            $scope[mapInstance.key] = mapInstance.map;
        }
    });

    //Set default options for map
    $scope.mapInstanceOption = {
        lat: -12.043333,
        lng: -77.028333,
        zoom: 12,
        click: function (e)
        {
            console.log(e);
        }
    }
}]);