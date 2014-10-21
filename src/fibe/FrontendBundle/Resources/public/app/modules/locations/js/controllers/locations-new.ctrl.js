
/**
 * New location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsNewCtrl', [ '$scope', '$window', '$routeParams', '$rootScope', '$location', 'locationsFact',
    function ($scope, $window, $routeParams, $rootScope, $location, locationsFact)
    {
        $scope.location = new locationsFact;
        $scope.location.equipments = [];

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

        $scope.create = function (form)
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

        //Autocomplete and add equipment workflow
        $scope.searchEquipments = equipmentsFact.all;
        $scope.addEquipment = function (equipmentModel)
        {
            $scope.location.equipments.push(equipmentModel);            
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
