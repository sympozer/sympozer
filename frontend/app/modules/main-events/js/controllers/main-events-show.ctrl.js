/**
 * Show conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'mainEventsFact', 'contextFact', 'topicsFact', function ($scope, $rootScope, $routeParams, mainEventsFact, contextFact, topicsFact)
{

    //Mandatory for the map plugin gmap to work
    $scope.geoCodingMapInstance;
    //Set default options for map rendering (mandatory)
    $scope.mapInstanceOption = {
        lat: -12.043333,
        lng: -77.028333,
        zoom: 12
    }

    //Mandatory for the map plugin gmap to work
    $scope.geoCodingMapInstance;

    //When main event correctly loaded, update map
    var success = function(){
        //Initialize the map with main event location
        if($scope.mainEvent.location){
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


    }

    //Send get request to server to fetch mainEvent
    $scope.mainEvent = mainEventsFact.get({id: $routeParams.mainEventId}, success);

    //Send get request to server to fetch mainEvent events and papers topics
    $scope.mainEventTopics = topicsFact.allByConference({'mainEventId': $routeParams.mainEventId});

    //Context change
    contextFact.changeContext($routeParams.mainEventId);


    //Bind new map instance from plugin to scope
    $scope.$on('GMaps:created', function (event, mapInstance) {
        if (mapInstance.key) {
            $scope[mapInstance.key] = mapInstance.map;
        }
    });



}]);