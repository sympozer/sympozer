/**
 * events schedule controller
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsScheduleCtrl', ['$scope', '$templateCache', 'categoriesFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'eventsFact', '$compile', '$modal', 'moment', 'locationsFact', 'dateDaysDifferenceFact', 'searchService', function ($scope, $templateCache, categoriesFact, $routeParams, GLOBAL_CONFIG, $rootScope, eventsFact, $compile, $modal, moment, locationsFact, dateDaysDifferenceFact, searchService) {

    /************ FULLCALENDAR DRV CONTROL ******************/

    //Initialize filter list for locations and events
    $scope.filters = {
        'mainEventId': $routeParams.mainEventId,
        'day'        : $rootScope.currentMainEvent.startAt
    };

    //Get locations according to the current filters and execute callback with response
    var fetchLocations = function (callback) {
        locationsFact.allByConference({'mainEventId': $routeParams.mainEventId}, function (response) {
            callback(response.results);
        });
    }

    //Get events according to the current filters and execute callback with response
    var fetchEvents = function (callback) {
        var serializedFilters = {};
       // searchService.serializeFilters($scope.filters, serializedFilters)
        eventsFact.allByConference($scope.filters, function (response) {
            callback(response.results);
        });
    }

    //link fullcalendar directive fetching function to local functions
    $scope.getEvents = fetchEvents;
    $scope.getResources = fetchLocations;
    $scope.initialDate = new moment($rootScope.currentMainEvent.startAt);


    /************ FILTERS CONTROL ******************/

        //Initilize open variable for accordions in filter box
    $scope.filterboxAccordionsShowOne = false;
    $scope.filterboxAccordions = [
        {open: false},
        {open: false},
        {open: false},
        {open: false},
        {open: false}
    ];

    //Fetch categories
    $scope.categories = categoriesFact.allByConference({'mainEventId': $routeParams.mainEventId});

    //Fetch locations
    $scope.locations = locationsFact.allByConference({'mainEventId': $routeParams.mainEventId});

    //Get current main event day list
    $scope.days = dateDaysDifferenceFact.getDaysDifference($rootScope.currentMainEvent.startAt, $rootScope.currentMainEvent.endAt);
    $scope.days[0].active = true;



    //Add to filter list
    $scope.addFilter = function (filter, value) {
        var filterIndex;

        //test if the filter is already in the filters
        if (!$scope.filters[filter]) {
            filterIndex = -1;
        } else {
            filterIndex = $scope.filters[filter].indexOf(value);
        }

        //If no, add it
        if (filterIndex == -1) {
            $scope.filters[filter] = value;
        }
        //If yes remove it
        else {
//            $scope.filters[filter].splice(filterIndex , 1);
            delete($scope.filters[filter]);
        }

        //Trigger the entity-list-handler filter function to send request
        $scope.filter();
    };

    $scope.filter = function () {
        $scope.refetchEvents();
    }

    $scope.addDaysFilter = function (index, day) {
        $scope.addFilter('day', day.date.format('yyyy-MM-ddTHH:mmZ'));
        $scope.goToDate(day.date);
    }

    /**
     * Add or remove a specific location in calendar view according to filters clicks
     * @param index, the index of the clicked location in the location tab
     * @param location, the location clicked
     */
    $scope.addLocationsFilter = function (index, location) {
        var inFilterArray = false;

        //Verify if the clicked location is already displayed (in the fullcalendar resource tab)
        for (var i = 0; i < $scope.resources.length; i++) {
            if ($scope.resources[i].id == location.id) {
                //If yes, remove it
                $scope.removeResource(i);
                inFilterArray = true;
            }
        }

        //If the location clicked is not used then add it to the tab
        if(!inFilterArray){
            $scope.addResource(location);
        }
    }




}]);

