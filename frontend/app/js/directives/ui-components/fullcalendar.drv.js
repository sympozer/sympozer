/**
 * fullcalendar directive
 * use to handle a full calendar instance manipulation
 */
angular.module('sympozerApp').directive('fullcalendar',[ 'GLOBAL_CONFIG', '$compile', 'eventsFact' , '$templateCache', '$modal', 'i18nSrv',function (GLOBAL_CONFIG, $compile, eventsFact, $templateCache, $modal, i18nSrv)
{
    return {
        restrict: 'EA',
        link: function (scope, element, $attrs, ngModel){

            scope.calendarEl = element;

            var initCalendar = function(resources){

                //Prepare a default location
                var defaultLocation = {
                    id   : '0',
                    name : "no location"
                }

                var currentLocal = i18nSrv.getCurrentLocalCode().split('_')[0];

                //Add the default location to the resource list
                resources.push(defaultLocation)

                //Declare new fullcalendar instance with the locations
                scope.calendarEl.fullCalendar({
                    height: 600,
                    editable: true,
                    droppable: true,
                    minTime : moment.duration(6, 'hours'),
                    maxTime : moment.duration(21, 'hours'),
                    defaultView : 'resourceDay',
                    defaultTimedEventDuration :   moment.duration(15, 'minutes'),
                    resources : resources,
                    resourceFilter: function (resource) {
                        return $.inArray(resource, scope.resources) > -1;
                    },
                    events : function(start, end, timezone, callback) {
                        //Fetch events and call callback to render
                        scope.getEvents(function(response) {
                            scope.event = response;
                            var source = {}
                            source.events = eventsToCalEvents(scope.event);

                            callback(source.events);
                        })
                    },
                    complete : function(){
                        scope.goToDate(scope.initialDate);
                    },
                    lang : currentLocal,
                    header:{
                        left: 'today',
                        center: 'title',
                        right: 'prev,next'
                    },
                    eventClick: scope.onEventClick,
                    eventDrop: scope.onEventDrop,
                    eventResize: scope.onEventResize,
                    eventRender: scope.eventRender,
                    selectable: true,
                    selectHelper: true,
                    eventAfterAllRender: function(){
                        //resize();
                    },
                    eventMouseover: scope.onMouseOver,
                    select : scope.onDurationSelection,
                    eventMouseout: function(calEvent, jsEvent) {
                        $(this).css('z-index', 8);
                        $('.tooltipevent').remove();
                    }
                })


            }


            /***************** UTILS  ***************/

            /**
             * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
             * @param obj1
             * @param obj2
             */
            var mergeObjects = function (obj1,obj2){
                for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
                return obj1;
            }

            /**
             * Find an oject in an array by value of a specific property
             * @param property, the property to look the value of
             * @param value, the value to look for
             * @param array, the array containing the object look
             * @returns false if nothing found, the js object if found
             */
            var findObjectByProp = function(property, value, array){
                for(i=0; i < array.length; i++){
                    if(array[i][property] == value){
                        return array[i];
                    }
                }
                return false;
            }

            /**********************************************************************/

            /**
             * Convert a sympozer event to a fullcalendar compatible event
             * @param sympozerEvent, the event to convert
             * @returns {{}}
             */
            var eventToCalEvent   = function(sympozerEvent){

                var newCalEvent = angular.copy(sympozerEvent);

                //Add location link if defined or link to "no location" otherwise
                var resourcesTab = [];
                if(sympozerEvent.location){
                    resourcesTab.push(sympozerEvent.location.id);
                }else{
                    resourcesTab.push('0');
                }

                newCalEvent.title     = sympozerEvent.label || "";
                newCalEvent.start     = new moment(sympozerEvent.startAt) || new moment();
                newCalEvent.end       = new moment(sympozerEvent.endAt)   || new moment();
                newCalEvent.resources = resourcesTab;

                return newCalEvent;
            }


            /**
             * Convert an array of sympozer event to an array of fullcalendar compatible events
             * @param sympozerEvents, the array to convert
             * @returns {Array}
             */
            var eventsToCalEvents = function(sympozerEvents){
                var calEvents = [];
                for(i=0; i<sympozerEvents.length; i++){
                    calEvents.push(eventToCalEvent(sympozerEvents[i]));
                }
                return calEvents;
            }

            /**
             * Convert a sympozer location to a fullcalendar compatible resource
             * @param sympozerLocation, the location to convert
             * @returns {{}}
             */
            var locationToCalResource   = function(sympozerLocation, calResource){
                if(calResource == undefined){
                    var calResource = angular.copy(sympozerLocation);
                }
                calResource.name = sympozerLocation.label || "";
                calResource.className = [];
                return calResource;
            }

            /**
             * Convert an array of sympozer event to an array of fullcalendar compatible events
             * @param sympozerEvents, the array to convert
             * @returns {Array}
             */
            var locationsToCalResources = function(sympozerLocations){
                var calResources = [];
                for(i=0; i<sympozerLocations.length; i++){
                    calResources.push(locationToCalResource(sympozerLocations[i]));
                }
                return calResources;
            }

            /**
             * Open a modal with the edit form of a specific event related to calEvent
             * @param date
             * @param jsEvent, the calEvent to edit
             * @param view
             */
            scope.editCalEvent = function (calEvent, jsEvent, view)
            {
                scope.eventId = calEvent.id;
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'modals/events-modal-form.html',
                    controller : 'eventsEditCtrl',
                    size       : "large",
                    scope: scope
                });
                modalInstance.result.then(function (sympozerEvent)
                {
                    mergeObjects(calEvent,sympozerEvent);
                    scope.calendarEl.fullCalendar( 'updateEvent', calEvent);
                    scope.calendarEl.fullCalendar( 'renderEvent',  calEvent );

                    scope.currentCalEvent = calEvent;
                })
            }



            //Fetch the locations
            scope.getResources(function(response) {
                scope.resources = locationsToCalResources(response);
                initCalendar(scope.resources);
            })


            /*
             * Directive from : https://github.com/angular-ui/ui-calendar
             * https://angular-ui.github.io/ui-calendar/
             */
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();


            /* alert on eventClick */
            scope.onEventClick = function( calEvent, jsEvent, view){
                console.log(calEvent.title + ' was clicked ');
            };

            /* alert on Drop */
            scope.onEventDrop = function(calEvent, delta, revertFunc, jsEvent, ui, view){

                //The event has been dropped in the "AllDay" box
                if(!calEvent.start.hasTime()){
                    calEvent.allDay = true;
                }else{
                    if(!calEvent.allDay) {
                        calEvent.startAt = moment(calEvent.startAt).add(delta).format();
                        calEvent.endAt = moment(calEvent.endAt).add(delta).format();
                    }else{
                        calEvent.startAt = moment(delta).format();
                    }
                    calEvent.allDay = false;
                }

                //Set location according to the resource tab value
                if(calEvent.resources[0] != 0){
                    calEvent.location = findObjectByProp('id', calEvent.resources[0], scope.resources);
                }else{
                    //Delete the location if the event had been dragged into the no_location (id=0) resource
                    delete(calEvent.location);
                }

                //Send event update query on the server
                eventsFact.update(eventsFact.serialize(calEvent));
            };

            /* Update the event if resized */
            scope.onEventResize = function(calEvent, delta, revertFunc, jsEvent, ui, view ){
                //Close all popovers
                scope.closePopovers();
                calEvent.endAt = moment(calEvent.endAt).add(delta).format();
                eventsFact.update(eventsFact.serialize(calEvent));
            };

            /* New event directly in the calendar */
            scope.onDurationSelection = function( start, end, jsEvent, view, resources ){

                //Close all popovers
                scope.closePopovers();

                //Initialize new event
                scope.newEvent = {};
                scope.newEvent.startAt = scope.newEvent.start = start;
                scope.newEvent.endAt = scope.newEvent.end = end;

                //Add location property according to the selected resource (resources[0])
                if(resources && resources[0]!= 0){
                    scope.newEvent.location = findObjectByProp('id', resources[0], scope.resources);
                }

                //Open a modal with the current scope containing the new event
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'modals/events-modal-form.html',
                    controller : 'eventsNewCtrl',
                    size       : "large",
                    scope: scope
                });

                //When the modal is closed and the event created
                modalInstance.result.then(function (sympozerEvent)
                {
                    //Reconvert incoming event to calevent
                    scope.calEvent = eventToCalEvent(sympozerEvent);

                    //Refresh  calendar
                    scope.calendarEl.fullCalendar( 'renderEvent',  scope.newEvent );

                    //Clean current newEvent
                    delete(scope.newEvent);
                })
            }


            /* add a resource to resource array */
            scope.addResource = function(location) {
                scope.resources.push(locationToCalResource(location));
                scope.renderCalendar();

            };

            /* add a resource to resource array */
            scope.removeResource = function(index) {
                scope.resources.splice(index, 1);
                scope.renderCalendar();
            };



            /* remove event */
            scope.remove = function(index) {
                scope.events.splice(index,1);
            };

            /* Change View */
            scope.changeView = function(view,calendar) {
                //Close all popovers
                scope.closePopovers();
                scope.calendarEl.fullCalendar('changeView',view);
            };

            /* Change View */
            scope.renderCalendar = function(calendar) {
                scope.calendarEl.fullCalendar('render', true);
            };

            scope.refetchEvents = function(){
                scope.calendarEl.fullCalendar( 'refetchEvents' );
            }

            /* Render Tooltip */
            scope.eventRender = function( calEvent, element, view ) {


                element.click(function(){

                    //Close all popovers
                    scope.closePopovers();

                    //Fetch the event with all its fields
                    scope.currentCalEvent = eventsFact.get({ 'id' : calEvent.id}, function(event){
                        //Calculate difference between start and end
                        var currentDuration = moment.duration(calEvent.end - calEvent.start);
                        //Create an understanable string to express the duration
                        scope.currentCalEvent.duration = currentDuration.humanize();
                    });

                    var options = {
                        content : $compile($templateCache.get("event-popover-lg.html"))(scope),
                        placement: calEvent.start.hours()>12?'top':'bottom',
                        html:true
                    };

                    $(this).popover(options);
                })


            };

            scope.onMouseOver =  function(calEvent, jsEvent, view) {
//        $(this).popover({
//            title: "My Title",
//            placement:calEvent.start.hours()>12?'top':'bottom',
//            html:true,
//            content: calEvent.msg
//        });
//
//        // change the border color just for fun
//        $(this).css('border', '1px solid black');

            }


            scope.closePopovers = function(){
                $('.popover').hide();
            }

            scope.goToDate = function(date){
                scope.calendarEl.fullCalendar('gotoDate', date);
            }

           scope.refreshEvents = function(){
               scope.renderCalendar();
           }
        }

    }
}])