/**
 * Edit conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'mainEventsFact', 'pinesNotifications', 'translateFilter', '$modal', 'GLOBAL_CONFIG', 'topicsFact', function ($scope, $rootScope, $routeParams, $location, mainEventsFact, pinesNotifications, translateFilter, $modal, GLOBAL_CONFIG, topicsFact)
{
    //Execute only if not in a modal context
    if (!$scope.$close)
    {

        var fetchSuccess = function (mainEvent)
        {
            if (mainEvent.location)
            {
                geoCode(mainEvent.location.label);
            }
        }


        //Initialize date pickers visibility
        $scope.endAtOpened = false;
        $scope.startAtOpened = false;



        //Fetch the mainEvent
        $scope.mainEvent = mainEventsFact.get({id: $routeParams.mainEventId}, fetchSuccess);


        //Send get request to server to fetch mainEvent events and papers topics
        $scope.mainEventTopics = topicsFact.allByConference({'mainEventId': $routeParams.mainEventId});

        //Mandatory for the map plugin gmap to work
        $scope.geoCodingMapInstance;

        //Set default options for map rendering (mandatory)
        $scope.mapInstanceOption = {
            lat : -12.043333,
            lng : -77.028333,
            zoom: 12
        };

        //On address defintion
        $scope.setAddress = function (selectedAddress)
        {
            //trigger map rendering of the selected address
            geoCode(selectedAddress.label);
            //Set new conference address
            $scope.mainEvent.location = selectedAddress;
            //Update main event
            $scope.updateMainEvent('location', $scope.mainEvent.location);

        };


        //On update main event error
        var error = function (response, args)
        {
            //Notify of the field update action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text : translateFilter('response.data.error.message'),
                type : 'error'
            });
        };

        //On update main event success
        var success = function (response, args)
        {
            //Notify of the field update action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text : translateFilter('global.validations.modifications_saved'),
                type : 'success'
            });
        };

        /**
         * Set the map with a marker at a specific address
         * @param address, address to geocode and put the marker on
         */
        var geoCode = function (address)
        {
            GMaps.geocode({
                address : address,
                callback: function (results, status)
                {
                    if (status == 'OK')
                    {
                        var latlng = results[0].geometry.location;
                        //Set map center
                        $scope.geoCodingMapInstance.setCenter(latlng.lat(), latlng.lng());
                        //Set marker
                        $scope.geoCodingMapInstance.addMarker({
                            lat: latlng.lat(),
                            lng: latlng.lng()
                        });
                    }
                }
            });
        }

        //Context change
        $rootScope.$broadcast('contextCtrl:changeContext', {mainEventId: $routeParams.mainEventId});


        //New start date validation
        $scope.onSelectStart = function (newDate)
        {

            //Verify startAt =< endAt
            if (moment(newDate).isBefore(moment($scope.mainEvent.endAt)) || moment(newDate).isSame(moment($scope.mainEvent.endAt)))
            {
                $scope.updateMainEvent('startAt', $scope.mainEvent.startAt);
            }
        };

        //New end date validation
        $scope.onSelectEnd = function (newDate)
        {
            //Verify startAt < endAt
            if (moment(newDate).isAfter(moment($scope.mainEvent.startAt)) || moment(newDate).isSame(moment($scope.mainEvent.startAt)))
            {
                $scope.updateMainEvent('endAt', $scope.mainEvent.endAt);
            }
        };


        //Bind new map instance from plugin to scope
        $scope.$on('GMaps:created', function (event, mapInstance)
        {
            if (mapInstance.key)
            {
                $scope[mapInstance.key] = mapInstance.map;
            }
        });
    }

    //Send patch request to server to update a given field
    $scope.updateMainEvent = function (field, data)
    {
        debugger;
        var updateMainEvent = {id: $scope.mainEvent.id};
        updateMainEvent[field] = data;
        return mainEventsFact.patch(updateMainEvent, success, error);
    };


    //Select logo modal workflow
    $scope.showLogoModal = function ()
    {
        // Open modal with main event logo form
        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.mainEvents.urls.partials + 'main-events-select-logo-modal.html',
            //The edit controller is responsible for it
            controller : 'mainEventsEditCtrl',
            size       : "large",
            resolve    : {
                //Passing current mainEvent as a parameter
                mainEvent: function ()
                {
                    return $scope.mainEvent;
                }
            }
        });

        //On success modal $close function call, resolve the promise
        modalInstance.result.then(function (logoUrl)
        {
            $scope.mainEvent.logo = logoUrl;
            $scope.updateMainEvent('logo', logoUrl);
        })
    }

}]);