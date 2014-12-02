/**
 * New location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsNewCtrl', [ '$scope', '$filter', '$window', '$routeParams', '$rootScope', '$location', 'locationsFact', 'equipmentsFact', 'pinesNotifications', 'translateFilter',
    function ($scope, $filter, $window, $routeParams, $rootScope, $location, locationsFact, equipmentsFact, pinesNotifications, translateFilter)
    {
        $scope.location = new locationsFact;
        $scope.location.equipments = [];
        $scope.location.localization = {};

        var error = function (response, args)
        {
            //Notify of error on delete request
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('locations.validations.not_created'),
                type: 'error'
            });
        };

        var success = function (response, args)
        {
            //Notify of error on delete request
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('locations.validations.created'),
                type: 'success'
            });

            if ($scope.$close)
            {
                $scope.$close($scope.location);
            }
            else
            {
                $window.history.back();
            }
        };

        $scope.save = function (form)
        {
            if (form.$valid)
            {
                $scope.location.mainEvent = $routeParams.mainEventId;
                locationsFact.create(locationsFact.serialize($scope.location), success, error);
            }
        };

        $scope.cancel = function ()
        {
            $scope.$dismiss('cancel');
        };

        //Populate array of a specific linked entity
        $scope.addRelationship = function (key, model)
        {
            //Check if array available for the linked entity
            if (!$scope.location[key])
            {
                $scope.location[key] = [];
            }

            //Stop if the object selected is already in array (avoid duplicates)
            if (!$filter('inArray')('id', model.id, $scope.location[key]))
            {
                //If no duplicate add the selected object to the specified array
                $scope.location[key].push(model);
            }
        };


        //Autocomplete and add equipment workflow
        $scope.searchEquipments = equipmentsFact.all;
        $scope.addEquipment = function (equipmentModel)
        {
            $scope.addRelationship('equipments', equipmentModel)
        };



        $scope.deleteEquipment = function (index)
        {
            $scope.location.equipments.splice(index, 1);
        };



        //Mandatory for the map plugin gmap to work
        $scope.geoCodingMapInstance;

        //Bind new map instance from plugin to scope
        $scope.$on('GMaps:created', function (event, mapInstance) {
            if (mapInstance.key) {
                $scope[mapInstance.key] = mapInstance.map;
            }
        });

        //Set default options for map
        $scope.mapInstanceOption = {
            lat: -12.043333,
            lng: -77.028333,
            zoom: 12,
            click: function (e)
            {
                console.log(e);
            }
        }

        //On address defintion
        $scope.selectAddress = function(selectedAddress){
            //trigger map rendering of the selected address
            submitGeocoding(selectedAddress);
            //Set new conference address
            $scope.location.localization = selectedAddress;
        }

        //Define a localization on map from an address string
        var submitGeocoding = function (address)
        {
            GMaps.geocode({
                address: address.label,
                callback: function (results, status)
                {
                    if (status == 'OK')
                    {
                        var latlng = results[0].geometry.location;

                        //Store latitude and longitude in localization object
                        $scope.location.localization.latitude = latlng.lat();
                        $scope.location.localization.longitude = latlng.lng();

                        $scope.geoCodingMapInstance.setCenter(latlng.lat(), latlng.lng());
                        $scope.geoCodingMapInstance.addMarker({
                            lat: latlng.lat(),
                            lng: latlng.lng()
                        });
                    }
                }
            });
        };

        //Geolocate the user to initilize the map next to where he is
        GMaps.geolocate({
            success: function(position) {
                $scope.geoCodingMapInstance.setCenter(position.coords.latitude, position.coords.longitude);
            }
        });

    }
]);
