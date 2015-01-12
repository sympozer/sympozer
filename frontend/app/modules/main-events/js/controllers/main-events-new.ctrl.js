/**
 * New conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsNewCtrl', [ '$scope', '$rootScope', '$location', 'mainEventsFact', 'formValidation', 'pinesNotifications', 'translateFilter', function ($scope, $rootScope, $location, mainEventsFact, formValidation, pinesNotifications, translateFilter)
{
    //Initialize a new conference
    $scope.conference = new mainEventsFact;

    //Initialize date pickers visibility
    $scope.endAtOpened = false;
    $scope.startAtOpened = false;

    //Set today
    $scope.today = new Date();

    //Set min date to today if not defined (see html)
    $scope.toggleMin = function ()
    {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();




    //Set init date
    $scope.initDate = $scope.today;


    //Mandatory for the map plugin gmap to work
    $scope.geoCodingMapInstance;

    //Bind new map instance from plugin to scope
    $scope.$on('GMaps:created', function (event, mapInstance)
    {
        if (mapInstance.key)
        {
            $scope[mapInstance.key] = mapInstance.map;
        }
    });

    //Set default options for map
    $scope.mapInstanceOption = {
        lat  : -12.043333,
        lng  : -77.028333,
        zoom : 12,
        click: function (e)
        {
            console.log(e);
        }
    }

    //On address defintion
    $scope.selectAddress = function (selectedAddress)
    {
        //trigger map rendering of the selected address
        submitGeocoding(selectedAddress);

        //Set new conference address
        $scope.conference.location = selectedAddress;
    }

    //Define a localization on map from an address string
    var submitGeocoding = function (address)
    {
        GMaps.geocode({
            address : address.label,
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
    };

    //Geolocate the user to initilize the map next to where he is
    GMaps.geolocate({
        success: function (position)
        {
            $scope.geoCodingMapInstance.setCenter(position.coords.latitude, position.coords.longitude);
        }
    });


    //On new conference request error
    var error = function (response, args)
    {
        //Check errors from the server
        if ("Validation Failed" == response.data.message)
        {
            //Display server error
            formValidation.transformFromServer(response);
        }
        else
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text : translateFilter(response.data.error || 'mainEvents.validations.not_created'),
                type : 'error'
            });
        }
    };

    //On new conference request success
    var success = function (response, args)
    {
        //Notify of the creation action success
        pinesNotifications.notify({
            title: translateFilter('global.validations.success'),
            text : translateFilter('mainEvents.validations.created'),
            type : 'success'
        });
        $location.path('/home/mainEvents/show/' + response.id);
    };

    //Send post request to server
    $scope.create = function (form)
    {
        //Form validity verification
        if (form.$valid)
        {
            mainEventsFact.create(mainEventsFact.serialize($scope.conference), success, error);
        }
    }


}]);
