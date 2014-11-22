/**
 * Show conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'mainEventsFact', function ($scope, $rootScope, $routeParams, mainEventsFact)
{

    //Mandatory for the map plugin gmap to work
    $scope.geoCodingMapInstance;
    //Set default options for map rendering (mandatory)
    $scope.mapInstanceOption = {
        lat: -12.043333,
        lng: -77.028333,
        zoom: 12
    }

    //When main event correctly loaded, update map
    var success = function(){
        GMaps.geocode({
            address: $scope.mainEvent.location.label,
            callback: function (results, status)
            {
                if (status == 'OK')
                {
                    var latlng = results[0].geometry.location;
                    $scope.geoCodingMapInstance.setCenter(latlng.lat(), latlng.lng());
                    $scope.geoCodingMapInstance.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                }
            }
        });
    }

    //Send get request to server to fetch mainEvent
    $scope.mainEvent = mainEventsFact.get({id: $routeParams.mainEventId}, success, error);

    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});


    //Bind new map instance from plugin to scope
    $scope.$on('GMaps:created', function (event, mapInstance) {
        if (mapInstance.key) {
            $scope[mapInstance.key] = mapInstance.map;
        }
    });

}]);