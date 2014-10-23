
/**
 * New location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('mainEventLocationsNewCtrl', [ '$scope', '$window', '$routeParams', '$rootScope', 'mainEventLocationFact', '$modalInstance', 'locationModel',
    function ($scope, $window, $routeParams, $rootScope, mainEventLocationFact, $modalInstance, locationModel)
    {
        if(locationModel){
            $scope.location = new mainEventLocationFact(locationModel);
        }else{
            $scope.location = new mainEventLocationFact;
        }

        //initialize map zoom
        $scope.center = { zoom: 2 }
        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the location has not been created', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'location created', type: 'success'});
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
                $scope.location.mainEvent = $routeParams.mainEventId;
                $scope.location.$create({}, success, error);
            }
        }

        $scope.cancel = function () {
            $scope.$dismiss('cancel');
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
    }
]);
