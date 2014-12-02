
/**
 * Edit location controller
 * @TODO implement a directive for the map handling to remove code duplication
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsEditCtrl', [ '$scope', '$filter', '$rootScope', '$routeParams', '$location','equipmentsFact', 'locationsFact',
    function ($scope, $filter, $rootScope, $routeParams, $location, equipmentsFact, locationsFact)
{

    $scope.location = locationsFact.get({id: $routeParams.locationId}, function(location){
        //initialize map with current location
        $scope.mapInstanceOption.lat = location.localization ? location.localization.latitude : 48;
        $scope.mapInstanceOption.long = location.localization ? location.localization.longitude.latitude  : 8;
        $scope.mapInstanceOption.zoom = 4;
    });

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'locations.validations.not_created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'locations.validations.created', type: 'success'});
        $location.path('/conference/'+$rootScope.currentMainEvent.id+'/locations/list');
    };

    $scope.save = function (form)
    {
        if (form.$valid)
        {
            locationsFact.$update(locationsFact.serialize($scope.location), success, error);
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