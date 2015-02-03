/**
 * events schedule controller
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsScheduleCtrl', ['$scope', '$templateCache', 'categoriesFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'eventsFact', '$compile', '$modal', 'moment', 'locationsFact', 'dateDaysDifferenceFact', function ($scope, $templateCache, categoriesFact, $routeParams, GLOBAL_CONFIG, $rootScope, eventsFact, $compile, $modal, moment, locationsFact, dateDaysDifferenceFact)
{

    /************ FULLCALENDAR DRV CONTROL ******************/

    //Initialize filter list for locations and events
    var eventsFilters = {'mainEventId' :$routeParams.mainEventId};
    var locationsFilters = {'mainEventId' :$routeParams.mainEventId};

    //Get locations according to the current filters and execute callback with response
    var fetchLocations = function(callback){
        locationsFact.allByConference(locationsFilters, function(response){
            callback(response.results);
        });
    }

    //Get events according to the current filters and execute callback with response
    var fetchEvents = function(callback){
        eventsFact.allByConference( eventsFilters, function(response){
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
    $scope.filterboxAccordions = [{open:false},{open:false},{open:false},{open:false},{open:false}];

    //Fetch categories
    $scope.categories = categoriesFact.allByConference({'mainEventId': $routeParams.mainEventId});

    //Fetch locations
    $scope.locations = locationsFact.allByConference({'mainEventId': $routeParams.mainEventId});

    //Get current main event day list
    $scope.days = dateDaysDifferenceFact.getDaysDifference($rootScope.currentMainEvent.startAt, $rootScope.currentMainEvent.endAt);
    $scope.days[0].active = true;

    $scope.filters=[];

    //Add to filter list
    $scope.addFilter = function (filter, value)
    {
        var filterIndex;

        //test if the filter is already in the filters
        if(!$scope.filters[filter]) {
            filterIndex = -1;
        }else{
            filterIndex = $scope.filters[filter].indexOf(value);
        }

        //If no, add it
        if (filterIndex  == -1)
        {
            $scope.filters[filter] = value;
        }
        //If yes remove it
        else
        {
//            $scope.filters[filter].splice(filterIndex , 1);
            delete($scope.filters[filter]);
        }

        //Trigger the entity-list-handler filter function to send request
        $scope.filter();
    };

    $scope.filter = function(){

    }

    $scope.addDaysFilter = function(index, day){
        $scope.addFilter('startAt', day.date);
        $scope.goToDate(day.date);
    }

    $scope.addLocationsFilter = function(index, id){
        $scope.addFilter('locations', id);
        $scope.goToDate(day.date);
    }


}]);

