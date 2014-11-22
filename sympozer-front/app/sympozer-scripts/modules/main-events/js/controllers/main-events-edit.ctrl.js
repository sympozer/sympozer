/**
 * Edit conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'mainEventsFact', '$modal', function ($scope, $rootScope, $routeParams, $location, mainEventsFact, $modal)
{
    var fetchSuccess = function(mainEvent){
        geoCode(mainEvent.location.label);
    }

    $scope.mainEvent = mainEventsFact.get({id: $routeParams.mainEventId}, fetchSuccess);

    //Mandatory for the map plugin gmap to work
    $scope.geoCodingMapInstance;

    //Set default options for map rendering (mandatory)
    $scope.mapInstanceOption = {
        lat: -12.043333,
        lng: -77.028333,
        zoom: 12
    }

    //On address defintion
    $scope.setAddress = function(selectedAddress){
        //trigger map rendering of the selected address
        geoCode(selectedAddress.label);
        //Set new conference address
        $scope.mainEvent.location = selectedAddress;
    }



    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the field has not been saved', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'field saved', type: 'success'});
    };

    var geoCode = function(address){
        GMaps.geocode({
            address: address,
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

    $scope.updateMainEvent = function(field, data){
        var updateMainEvent = {id: $scope.mainEvent.id};
        updateMainEvent[field] = data;
        return mainEventsFact.patch(updateMainEvent, success, error);
    };


    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});


    $scope.onSelectStart = function(newDate, oldDate){
        //Verify startAt < endAt
        if (moment(newDate).isBefore(moment($scope.mainEvent.endAt)))
        {
            $scope.updateMainEvent('startAt', newDate);
        }
    }

    $scope.onSelectEnd= function(newDate, oldDate){
        //Verify startAt < endAt
        if (moment(newDate).isAfter(moment($scope.mainEvent.startAt)))
        {
            $scope.updateMainEvent('endAt', newDate);
        }
    }


    //Bind new map instance from plugin to scope
    $scope.$on('GMaps:created', function (event, mapInstance) {
        if (mapInstance.key) {
            $scope[mapInstance.key] = mapInstance.map;
        }
    });
}]);