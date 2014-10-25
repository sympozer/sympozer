
/**
 * Edit location of main event controller
 * @TODO implement a directive for the map handling to remove code duplication
 * @type {controller}
 */
angular.module('locationsApp').controller('mainEventLocationsEditCtrl', [ '$scope', '$window', '$rootScope', '$routeParams', '$location','equipmentsFact', 'mainEventLocationFact',  'locationModel', function ($scope, $window, $rootScope, $routeParams, $location, equipmentsFact, mainEventLocationFact, locationModel)
{
    //initialize map zoom
    $scope.center = { zoom: 2 };

    $scope.markers = [];
    var addMarkers = function(location){
        //initialize map with current location
        $scope.center.lat = location.latitude || 48;
        $scope.center.long = location.longitude  || 8;
        $scope.center.zoom = 4;
        $scope.markers.push({
            lat: location.latitude,
            lng: location.longitude,
            message: "Your event"
        });

    }

    if(locationModel){
        $scope.location = new mainEventLocationFact(locationModel);
        addMarkers(locationModel);
    }else{
        $scope.location = mainEventLocationFact.get({id: $routeParams.locationId}, addMarkers);
    }


    if(!$scope.location.equipments){
        $scope.location.equipments =[];
    }

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the location has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'location saved', type: 'success'});
        if($scope.$close){
            $scope.$close($scope.location);
        }else{
            $window.history.back();
        }
    }

    $scope.save = function (form)
    {
        if (form.$valid)
        {
            $scope.location.$update({}, success, error);

        }
    }

    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    //Autocomplete and add equipment workflow
    $scope.searchEquipments = equipmentsFact.all;
    $scope.addEquipment = function (equipmentModel)
    {
            $scope.location.equipments.push(equipmentModel);            
    }



    $scope.markers = [];
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

}]);