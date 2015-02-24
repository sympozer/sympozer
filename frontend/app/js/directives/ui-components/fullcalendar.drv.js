/**
 * fullcalendar directive
 * use to handle a full calendar instance manipulation
 */
angular.module('sympozerApp').directive('fullcalendar',[ 'GLOBAL_CONFIG', '$compile', 'eventsFact' , '$templateCache', '$modal', 'i18nSrv',function (GLOBAL_CONFIG, $compile, eventsFact, $templateCache, $modal, i18nSrv)
{
    return {
        restrict: 'EA',
        link: function (scope, element, $attrs, ngModel){

            //Element root of the fullcalendar instance
            scope.calendarEl = element;

            /**
             * Start an instance of fullcalendar according to setting
             * @param resources, the list of resources the calendar needs to render
             */
            var initCalendar = function(resources){

                //Prepare a default location
                var defaultLocation = {
                    id   : '0',
                    name : "no location"
                }

                //Get the current local code
                var currentLocal = i18nSrv.getCurrentLocalCode().split('_')[0];

                //Add the default location to the resource list
                resources.push(defaultLocation)

                //Declare new fullcalendar instance with the locations
                scope.calendarEl.fullCalendar({
                    height: 600, //max height
                    editable: true, //Events can be updated
                    droppable: true, //Events can be dropped inside from outside
                    selectable: true, // A selection can be done to create a new event
                    selectHelper: true, // Show what is selected when selecting
                    minTime : globalConfig.app.modules.schedule.constants.calendar_start_hour, // Time at which the calendar starts
                    maxTime : globalConfig.app.modules.schedule.constants.calendar_end_hour, // Time at which the calendar ends
                    defaultView : 'resourceDay', // View used by default
                    defaultTimedEventDuration : globalConfig.app.modules.schedule.constants.calendar_default_time_event_durantion, // Default time duration if not specified
                    resources : resources, // List of the resources to display in x axe
                    lang : currentLocal, // The local code (format : 'en' / 'fr')
                    header:{
                        left: 'today',
                        center: 'title',
                        right: 'prev,next'
                    },
                    events : function(start, end, timezone, callback) {
                        //Fetch events and call callback to render
                        scope.getEvents(function(response) {
                            scope.events = response;
                            var source = {}
                            source.events = eventsToCalEvents(scope.events);
                            callback(source.events);
                        })
                    },
                    complete : scope.onCalendarComplete,
                    resourceFilter: scope.resourceFilter,
                    eventRender: scope.onEventRender,
                    eventMouseover: scope.onMouseOver,
                    select : scope.onDurationSelection,
                    eventClick: scope.onEventClick,
                    eventDrop: scope.onEventDrop,
                    eventResize: scope.onEventResize,
                    drop: scope.onExternalEventDrop,
                    eventDragStart: scope.onEventDragStart,
                    eventDragStop: scope.onEventDragStop
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

            /****************** TRANSFOMERS ***********/

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



            /****************** TRANSFOMERS ***********/

            /**
             * Filter a resource based on its id. If the resource in parameters is in the resources array then true, false otherwise
             */
            scope.resourceFilter = function (resource) {
                return findObjectByProp('id', resource.id, scope.resources);
            },

            /**
             * Function called just after fullcalendar has finish loading
             */
                scope.onCalendarComplete = function(){
                    //Go to initial date
                    scope.goToDate(scope.initialDate);
                },

            /**
             * Open a modal with the edit form of a specific event related to calEvent
             * @param date
             * @param jsEvent, the calEvent to edit
             * @param view
             */
                scope.editCalEvent = function (calEvent, jsEvent, view)
                {
                    //Get event id
                    scope.eventId = calEvent.id;
                    //Open edit modal
                    var modalInstance = $modal.open({
                        templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'modals/events-modal-form.html',
                        controller : 'eventsEditCtrl',
                        size       : "large",
                        scope: scope
                    });
                    //On modal close
                    modalInstance.result.then(function (sympozerEvent)
                    {
                        mergeObjects(calEvent,sympozerEvent);

                        scope.calendarEl.fullCalendar( 'updateEvent', sympozerEvent);
                        scope.calendarEl.fullCalendar( 'renderEvent',  sympozerEvent );

                        scope.currentCalEvent = calEvent;
                    })
                }


            /**
             * Callback to init fullcalendar after resources have been fetched
             */
            scope.getResources(function(response) {
                scope.resources = locationsToCalResources(response);
                initCalendar(scope.resources);
            })


            /**
             * Nothing so far
             * @param calEvent
             * @param jsEvent
             * @param view
             */
            scope.onEventClick = function( calEvent, jsEvent, view){
                console.log(calEvent.title + ' was clicked ');
            };


            /**
             * Handle the selection of a duration on the calendar. Creates a new event according to the selection
             * @param start, the selection start moment
             * @param end, the selection end moment
             * @param jsEvent, jsEvent
             * @param view, the fullcalendar view
             * @param resources, the resources array
             */
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


            /**
             * Transform a sympozer resource into cal resource and add it to the resources array
             * @param location
             */
            scope.addResource = function(location) {
                scope.resources.push(locationToCalResource(location));
                scope.renderCalendar();

            };

            /**
             * Remove a resource from the resource array by id
             * @param index
             */
            scope.removeResource = function(index) {
                scope.resources.splice(index, 1);
                scope.renderCalendar();
            };


            /**
             * Change view (resource view, month view ...)
             * @param view
             * @param calendar
             */
            scope.changeView = function(view, calendar) {
                //Close all popovers
                scope.closePopovers();
                scope.calendarEl.fullCalendar('changeView',view);
            };

            /**
             * Render the calendar
             * @param calendar
             */
            scope.renderCalendar = function(calendar) {
                scope.calendarEl.fullCalendar('render', true);
            };

            /**
             * Trigger fullcalendar refetch event (re execute the "events" method)
             */
            scope.refetchEvents = function(){
                scope.calendarEl.fullCalendar('refetchEvents');
            }

            /**
             * Prepare the popover box for each event when rendering.
             * @param calEvent
             * @param element
             * @param view
             */
            scope.onEventRender = function( calEvent, element, view) {
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

                    //Declare popover options
                    var options = {
                        content : $compile($templateCache.get("event-popover-lg.html"))(scope),
                        placement: calEvent.start.hours()>12?'top':'bottom',
                        html:true
                    };

                    //Attache the popover to the event element
                    $(this).popover(options);
                })
            };

            scope.onMouseOver =  function(calEvent, jsEvent, view) {
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


            /************************* EVENTS MOVMENTS ***********************/

            /**
             * Called when a calevent is dropped into fullcalendar
             * @param calEvent, the calevent dropped
             * @param delta, the duration difference between initiale and current position
             * @param revertFunc
             * @param jsEvent
             * @param ui
             * @param view
             */
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

            /**
             * Handle rezising an event in fullcalendar
             * @param calEvent
             * @param delta
             * @param revertFunc
             * @param jsEvent
             * @param ui
             * @param view
             */
            scope.onEventResize = function(calEvent, delta, revertFunc, jsEvent, ui, view ){
                //Close all popovers
                scope.closePopovers();
                calEvent.endAt = moment(calEvent.endAt).add(delta).format();
                eventsFact.update(eventsFact.serialize(calEvent));
            };

            /**
             * Handle drop inside fullcalendar from outside
             * @param date
             * @param allDay
             * @param event
             * @param ui
             */
            scope.onExternalEventDrop = function(date, allDay, event, ui) { //drop from sidebar

//                //Set start and end date
//                scope.draggedEvent.startAt = date;
//                scope.draggedEvent.endAt = date.add(30,'minutes');
//
//                //Create a cal event
//                var newCalEvent = eventToCalEvent(scope.draggedEvent);
//
//                //Save  start date and end date
//                eventsFact.update(eventsFact.serialize(scope.draggedEvent));
//
//                //Refresh  calendar
//                scope.calendarEl.fullCalendar( 'renderEvent',  newCalEvent );
//
//                //Clean current newEvent
//                delete(scope.draggedEvent);
            }


            /**
             * Start dragging an event
             */
            scope.onEventDragStart = function( event, jsEvent, ui, view ) {
                $(this).css('z-index', '1100');
                scope.dragged = findObjectByProp('id', event.id, scope.events);
            },

            /**
             * Stop dragging an event
             */
            scope.onEventDragStop = function( event, jsEvent, ui, view ) {
                scope.dragged = event;
            }
        }
    }
}])
