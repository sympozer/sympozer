
/**
 * Edit location controller
 * @TODO implement a directive for the map handling to remove code duplication
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location','equipmentsFact', 'locationsFact', function ($scope, $rootScope, $routeParams, $location, equipmentsFact, locationsFact)
{
    //initialize map zoom
    $scope.center = { zoom: 2 };

    $scope.location = locationsFact.get({id: $routeParams.locationId}, function(location){
        //initialize map with current location
        $scope.center.lat = location.latitude || 48;
        $scope.center.long = location.longitude  || 8;
        $scope.center.zoom = 4;
        $scope.markers.push($scope.center);
    });

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the location has not been saved', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'location saved', type: 'success'});
        $location.path('/conference/'+$rootScope.currentMainEvent.id+'/locations/list');
    };

    $scope.save = function (form)
    {
        if (form.$valid)
        {
            $scope.location.$update({}, success, error);
        }
    };

    //Autocomplete and add equipment workflow
    $scope.searchEquipments = equipmentsFact.all;
    $scope.addEquipment = function (equipmentModel)
    {
        $scope.location.equipments.push(equipmentModel);            
    };

    $scope.markers = new Array();
    $scope.$on("leafletDirectiveMap.click", function (event, args)
    {
        var leafEvent = args.leafletEvent;
        $scope.markers.splice(0,$scope.markers.length)
        $scope.markers.push({
            lat: leafEvent.latlng.lat,
            lng: leafEvent.latlng.lng,
            message: "Event Marker"
        });

        $scope.location.latitude = leafEvent.latlng.lat;
        $scope.location.longitude = leafEvent.latlng.lng;

    });

    $scope.deleteEquipment= function(index){
        $scope.location.equipments.splice(index, 1);
    };

}]);