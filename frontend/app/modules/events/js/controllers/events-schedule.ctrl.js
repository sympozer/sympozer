/**
 * events schedule controller
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsScheduleCtrl', ['$scope', '$templateCache', 'categoriesFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'eventsFact', '$compile', '$modal', 'moment', 'locationsFact', 'dateDaysDifferenceFact', 'searchService', 'topicsFact', function ($scope, $templateCache, categoriesFact, $routeParams, GLOBAL_CONFIG, $rootScope, eventsFact, $compile, $modal, moment, locationsFact, dateDaysDifferenceFact, searchService, topicsFact) {

    /************ FULLCALENDAR DRV CONTROL ******************/

    //Initialize query for label search
    $scope.query = {};

    $scope.showSideboxRight = false;

    //Initialize filter list for locations and events
    $scope.filters = {
        'mainEventId': $routeParams.mainEventId,
    };

    //Open / close the sidebox with filters
    $scope.toggleSideboxRight = function(){
        $scope.showSideboxRight=!$scope.showSideboxRight;
    }


    //Get locations according to the current filters and execute callback with response
    var fetchLocations = function (callback) {
        locationsFact.allByConference({'mainEventId': $routeParams.mainEventId}, function (response) {
            callback(response.results);
        });
    }

    //Get events according to the current filters and execute callback with response
    var fetchEvents = function (callback) {
        var serializedFilters = {};

        //Serialize filters according to backend format
        searchService.serializeFilters($scope.filters, serializedFilters);

        //Add the mainEvent id for the backend url resolving
        serializedFilters.mainEventId = $routeParams.mainEventId;

        //Add the current query
        serializedFilters.query= $scope.querySended;

        //Request events according to serialized filters
        eventsFact.allByConference(serializedFilters, {}, function (response) {
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
    categoriesFact.allByConference({'mainEventId': $routeParams.mainEventId}, function(response){
        $scope.categories = response.results;
    });

    //Fetch locations
    locationsFact.allByConference({'mainEventId': $routeParams.mainEventId}, function(response){
        $scope.locations = response.results;
    });

    //Fetch topics
    topicsFact.allByConference({'mainEventId': $routeParams.mainEventId}, function(response){
        $scope.topics = response.results;
    });

    //Get current main event day list
    $scope.days = dateDaysDifferenceFact.getDaysDifference($rootScope.currentMainEvent.startAt, $rootScope.currentMainEvent.endAt);
    $scope.days[0].active = true;



    //Add to filter list
    $scope.addFilter = function (filter, value) {

        $scope.filters[filter] = value;

    };

    /**
     *
     * @param arrayOfData
     * @param filterId
     */
    $scope.removeFilter = function(filterId, arrayOfData){

        if($scope.filters[filterId]){
            delete($scope.filters[filterId]);
        }

        if(arrayOfData){
            //Reset active property all the filters choices related to "filterId"
            for(var i=0; i<$scope[arrayOfData].length; i++){
                $scope[arrayOfData][i].active = true;
            }
        }

        if(filterId == "query"){
            delete($scope.querySended);
            $scope.query.sended = false;
            $scope.query.label = null;
        }


        $scope.filter();
    }

    $scope.filter = function () {
        $scope.refetchEvents();
    }

    $scope.addDaysFilter = function (index, day) {

        //Define the beginning of the selected day
        var dayStart = new moment(day.date);
        dayStart.hours(0);
        dayStart.minutes(0);

        //Define the end of the selected day
        var dayEnd = new moment(day.date);
        dayEnd.hours(23);
        dayEnd.minutes(59);

        //Add a date interval filter
        $scope.addFilter('start', dayStart.format());
        $scope.addFilter('end', dayEnd.format());

        //Call fullcalendar directive to change day
        $scope.goToDate(dayStart);

        //Remove active property on all other days
        for(var i=0; i<$scope.days.length; i++){
            $scope.days[i].active = false;
        }
        //the day clicked is now "active"
        $scope.days[index].active = true;


        //Trigger the entity-list-handler filter function to send request
        $scope.filter();
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

        //Trigger the entity-list-handler filter function to send request
        $scope.filter();
    }

    /**
     * Add a filter on the selected category
     * @param index, the index of the clicked category in the category tab
     * @param category, the category clicked
     */
    $scope.addCategoriesFilter = function (index, category) {


        $scope.addFilter('categoryId', category.id);

        //Remove active property on all other categories
        for(var i=0; i<$scope.categories.length; i++){
            $scope.categories[i].active = false;
        }

        //the category clicked is now "active"
        $scope.categories[index].active = true;

        //Trigger the entity-list-handler filter function to send request
        $scope.filter();

    }


    /**
     * Add a filter on the selected topic
     * @param index, the index of the clicked topic in the topic tab
     * @param topic, the topic clicked
     */
    $scope.addTopicsFilter = function (index, topic) {
        $scope.addFilter('topicId', topic.id);

        //Remove active property on all other topics
        for(var i=0; i<$scope.topics.length; i++){
            $scope.topics[i].active = false;
        }

        //the topic clicked is now "active"
        $scope.topics[index].active = true;

        //Trigger the entity-list-handler filter function to send request
        $scope.filter();

    }

    $scope.addLabelFilter = function(){

//        $scope.addFilter('query', $scope.query.label);
        $scope.query.sended = true;

        $scope.querySended = $scope.query.label;

        //Trigger the entity-list-handler filter function to send request
        $scope.filter();
    }



}]);

