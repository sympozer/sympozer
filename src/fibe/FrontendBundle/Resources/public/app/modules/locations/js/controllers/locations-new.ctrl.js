
/**
 * New location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsNewCtrl', [ '$scope', '$filter', '$window', '$routeParams', '$rootScope', '$location', 'locationsFact', 'equipmentsFact',
    function ($scope, $filter, $window, $routeParams, $rootScope, $location, locationsFact, equipmentsFact)
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

        //Populate array of a specific linked entity
        $scope.addRelationship = function(key, model){
            //Check if array available for the linked entity
            if(!$scope.location[key]){
                $scope.location[key] = [];
            }

            //Stop if the object selected is already in array (avoid duplicates)
            if(! $filter('inArray')('id', model.id, $scope.location[key])){
                //If no duplicate add the selected object to the specified array
                $scope.location[key].push(model);
            };
        }


        //Autocomplete and add equipment workflow
        $scope.searchEquipments = equipmentsFact.all;
        $scope.addEquipment = function (equipmentModel)
        {
            $scope.addRelationship('equipments',equipmentModel)
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

         $scope.deleteEquipment= function(index){
            $scope.location.equipments.splice(index, 1);
       };
    }
]);
