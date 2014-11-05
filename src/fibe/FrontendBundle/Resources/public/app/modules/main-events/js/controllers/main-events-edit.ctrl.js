/**
 * Edit conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'mainEventsFact', '$modal', function ($scope, $rootScope, $routeParams, $location, mainEventsFact, $modal)
{
    $scope.mainEvent = mainEventsFact.get({id: $routeParams.mainEventId});

    //initialize map zoom
    $scope.center = { zoom: 2 }

    $scope.markers = [];
    var updateMarkers = function(marker){
        $scope.markers.splice(0, $scope.markers.length);
        $scope.markers.push(marker);
    };

    if($scope.mainEvent.mainEventLocation){
        updateMarkers({
            lat: $scope.mainEvent.mainEventLocation.latitude,
            lng: $scope.mainEvent.mainEventLocation.longitude,
            message: "Your event"
        })
    }

    $scope.editLocation = function()
    {
        var locationCtrl = 'mainEventLocationsEditCtrl';
        if(!$scope.mainEvent.mainEventLocation){
            locationCtrl = 'mainEventLocationsNewCtrl';
        }
        var modalInstance = $modal.open({
            templateUrl: $rootScope.GLOBAL_CONFIG.app.modules.locations.urls.partials + 'locations-modal-form.html',
            controller: locationCtrl,
            size: "large",
            resolve: {
                locationModel: function () {
                    return $scope.mainEvent.mainEventLocation;
                }
            }
        });
        modalInstance.result.then(function (newLocation) {
            $scope.mainEvent.mainEventLocation = newLocation;
            if(newLocation.latitude){
                updateMarkers({
                    lat: newLocation.latitude,
                    lng: newLocation.longitude,
                    message: "Your event"
                })
            }
        });
    };

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the field has not been saved', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'field saved', type: 'success'});
    };

    $scope.updateMainEvent = function(field, data){
        var updateMainEvent = {id: $scope.mainEvent.id};
        updateMainEvent[field] = data;
        return mainEventsFact.patch(updateMainEvent, success, error);
    };

    $scope.onSelectStart = function(newVal, oldVal){
        //date format fix
        newVal = moment(newVal.toString()).format();
        $scope.updateMainEvent('startAt', newVal);
    };

    $scope.onSelectEnd = function(newVal, oldVal){
        //date format fix
        newVal = moment(newVal.toString()).format();
        $scope.updateMainEvent('endAt', newVal);
    };

    //Context change
    $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});


}]);