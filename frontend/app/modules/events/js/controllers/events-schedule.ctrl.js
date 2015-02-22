/**
 * events schedule controller
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsScheduleCtrl',
    ['$scope', '$templateCache', 'categoriesFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'eventsFact', '$compile', '$modal', 'moment', 'locationsFact', 'dateDaysDifferenceFact', 'searchService', 'topicsFact',
        function ($scope, $templateCache, categoriesFact, $routeParams, GLOBAL_CONFIG, $rootScope, eventsFact, $compile, $modal, moment, locationsFact, dateDaysDifferenceFact, searchService, topicsFact)
        {

            /************ UTILS ******************/

            /**
             * Create a moment binded on the very beginning of the day string given
             * @param day, the day we want the start from
             * @returns {moment}
             */
            var getDayStart = function(day){

                var dayStart = new moment(day);
                dayStart.hours(0);
                dayStart.minutes(0);
                return dayStart;
            };

            /**
             * Create a moment binded on the very end of the day string given
             * @returns {moment}
             */
            var getDayEnd = function(day){
                var dayEnd = new moment(day);
                dayEnd.hours(23);
                dayEnd.minutes(59);
                return dayEnd;
            };

            /************ FULLCALENDAR DRV CONTROL ******************/

            //Initialize query for label search
            $scope.query = {};

            $scope.showSideboxRight = false;

            //Initialize filter list with the current main event at the first day
            $scope.filters = {
                'mainEventId': $routeParams.mainEventId,
                'start' : getDayStart($rootScope.currentMainEvent.startAt).format(),
                'end' : getDayEnd($rootScope.currentMainEvent.startAt).format()
            };

            //Open / close the sidebox with filters
            $scope.toggleSideboxRight = function(){
                $scope.showSideboxRight=!$scope.showSideboxRight;
            };


            //Get locations according to the current filters and execute callback with response
            var fetchLocations = function (callback) {
                locationsFact.allByConference({'mainEventId': $routeParams.mainEventId}, function (response) {
                    callback(response.results);
                });
            };

            //Get events according to the current filters and execute callback with response
            var fetchEvents = function (callback) {
                var serializedFilters = {};

                //Serialize filters according to backend format
                searchService.serializeFilters($scope.filters, serializedFilters);

                //Add the mainEvent id for the backend url resolving
                serializedFilters.mainEventId = $routeParams.mainEventId;

                //Add the current query
                serializedFilters.query= $scope.querySended;

                //Increase the limit
                serializedFilters.limit= 100;

                //Request events according to serialized filters
                eventsFact.allByConference(serializedFilters, {}, function (response) {
                    callback(response.results);
                });
            };

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
             * Delete a specific filter from scope.filters and reset "active" property on all possible choices for the filter
             * @param filterId, the id of the filter to remove in  scope.filters
             * @param arrayOfChoices, the array containing the choices for the filterId
             */
            $scope.removeFilter = function(filterId, arrayOfChoices){

                //If filter exist, delete it
                if($scope.filters[filterId]){
                    delete($scope.filters[filterId]);
                }

                //If array of choices exist
                if(arrayOfChoices){
                    //Reset active property all the filters choices related to "filterId"
                    for(var i=0; i<$scope[arrayOfChoices].length; i++){
                        $scope[arrayOfChoices][i].active = true;
                    }
                }

                //Reset query if the filter to remove is query
                if(filterId == "query"){
                    delete($scope.querySended);
                    $scope.query.sended = false;
                    $scope.query.label = null;
                }

                //Trigger the refetch events
                $scope.filter();
            }

            //Send a new request with the current filters
            $scope.filter = function () {
                $scope.refetchEvents();
            }


            /**
             * Filter event according to a specific day
             * @param index, the index of the selected day in the days array
             * @param day, a string respresenting the date of the selected day
             */
            $scope.addDaysFilter = function (index, day) {

                //Define the beginning of the selected day
                var dayStart = getDayStart(day.date);

                //Define the end of the selected day
                var dayEnd = getDayEnd(day.date);

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

                //the category clicked is now "active"
                $scope.categories[index].active = true;

                //Remove active property on all other categories
                for(var i=0; i<$scope.categories.length; i++){
                    $scope.categories[i].active = false;
                }

                //the category clicked is now "active"
                $scope.categories[index].active = true;
                //Trigger the filter function to send request with
                $scope.filter();

            }

            /**
             * Add a filter on the selected topic
             * @param index, the index of the clicked topic in the topic tab
             * @param topic, the topic to filter on
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

            /**
             * Add a query to the request to filter the events on a specific label
             * The current $scope.query is used to determine what label to filter on
             */
            $scope.addLabelFilter = function(){

                if($scope.query.label){

                    //set the current query
                    $scope.querySended = $scope.query.label;

                    //Trigger the entity-list-handler filter function to send request
                    $scope.filter();

                    //Flag the query as "sended" to display it in filter area
                    $scope.query.sended = true;
                }

            }

            /************ UNSCHEDULED EVENT HANDLING ******************/


}]);

