
/**
 * New location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsNewCtrl', [ '$scope', '$routeParams', '$rootScope', '$location', 'locationsFact', function ($scope, $routeParams, $rootScope, $location, locationsFact)
{
    $scope.location = new locationsFact;

    //initialize map zoom
    $scope.center = { zoom: 2 }
    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the location has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'location created', type: 'success'});
        $location.path('/conference/'+$routeParams.mainEventId+'/locations/list');
    }

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.location.mainEvent = $routeParams.mainEventId;
            $scope.location.$create({}, success, error);
        }
    }

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
}
]);
