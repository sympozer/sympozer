/**
 * Show location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsShowCtrl', [ '$scope', '$routeParams', 'locationsFact', function ($scope, $routeParams, locationsFact)
{
    $scope.location = locationsFact.get({id: $routeParams.locationId});
     //initialize map zoom
    $scope.center = { zoom: 2 }
    $scope.location = locationsFact.get({id: $routeParams.locationId}, function(location){
        //initialize map with current location
        $scope.center.lat = location.latitude || 48;
        $scope.center.long = location.longitude  || 8;
        $scope.center.zoom = 4;
        $scope.markers = [];
        $scope.markers.push($scope.center);
    });

}]);