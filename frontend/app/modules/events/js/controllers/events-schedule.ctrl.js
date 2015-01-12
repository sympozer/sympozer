/**
 * List events controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsScheduleCtrl', ['$scope', '$templateCache', 'categoriesFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'eventsFact', '$compile', '$modal', 'moment', 'locationsFact', function ($scope, $templateCache, categoriesFact, $routeParams, GLOBAL_CONFIG, $rootScope, eventsFact, $compile, $modal, moment, locationsFact)
{

    //Context change
    //$rootScope.$broadcast('contextCtrl:changeContext', {mainEventId:$routeParams.mainEventId});

    $scope.calendarEl = $('#calendar');
    var initCalendar = function(locations){

        //Prepare a default location
        var defaultLocation = {
            id   : '0',
            name : "no location"
        }

        //Add the default location to the location list
        locations.push(defaultLocation)

        //Declare new fullcalendar instance with the locations
        $scope.calendarEl.fullCalendar({
            height: 600,
            editable: true,
            droppable: true,
            minTime : moment.duration(6, 'hours'),
            maxTime : moment.duration(21, 'hours'),
            defaultView : 'resourceDay',
            defaultTimedEventDuration :   moment.duration(15, 'minutes'),
            resources : locations,
            events : function(start, end, timezone, callback) {
                //Fetch events and call callback to render
                eventsFact.allByConference({'mainEventId' :$routeParams.mainEventId, 'limit' : 40}, function(response) {
                    $scope.event = response.results;
                    var source = {}
                    source.events = eventsToCalEvents($scope.event);

                    callback(source.events);
                })
            },
            complete : function(){
                return;
            },
            header:{
                left: 'resourceDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventClick: $scope.onEventClick,
            eventDrop: $scope.onEventDrop,
            eventResize: $scope.onEventResize,
            eventRender: $scope.eventRender,
            selectable: true,
            selectHelper: true,
            eventAfterAllRender: function(){
                //resize();
            },
            eventMouseover: $scope.onMouseOver,


            eventMouseout: function(calEvent, jsEvent) {
                $(this).css('z-index', 8);
                $('.tooltipevent').remove();
            },
        })

        //From demo
//        function resize(option) {
//            var individualSize = 170;
//            var width = Math.max(element.width(), individualSize * $('.fc-day-header').length);
//            $('.fc-view').width(width);
//            $('.fc-scroller').perfectScrollbar(option);
//            $('.fc-view-container')
//                .perfectScrollbar(option)
//                .scroll(function () {
//                    // for the left column
//                    var scrollLeft = $(this).scrollLeft()-1;
//                    $(this).find('.fc-slats .fc-axis').css('left', scrollLeft);
//                })
//                .scroll(function () {
//                    // for the vertical scrollbar
//                    var scrollbar = $('.fc-scroller .ps-scrollbar-y-rail');
//                    var scrollLeft = Math.min( $(this).scrollLeft() + $(this).width(), $(this).children('.fc-view').width());
//                    scrollbar.css('left', scrollLeft -(scrollbar.outerWidth()+2));
//                })
//                .triggerHandler('scroll');
//        }


    }


    /**
     * Convert a sympozer event to a fullcalendar compatible event
     * @param sympozerEvent, the event to convert
     * @returns {{}}
     */
    var eventToCalEvent   = function(sympozerEvent, calEvent){
        if(calEvent == undefined){
            var calEvent = angular.copy(sympozerEvent);
        }

        //Add location link if defined or link to "no location" otherwise
        var resourcesTab = [];
        if(sympozerEvent.location){
            resourcesTab.push(sympozerEvent.location.id);
        }else{
            resourcesTab.push('0');
        }

        calEvent.title     = sympozerEvent.label || "";
        calEvent.start     = new moment(sympozerEvent.startAt) || new moment();
        calEvent.end       = new moment(sympozerEvent.endAt)   || new moment();
        calEvent.resources = resourcesTab;



        return calEvent;
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
            var calResource = {};
        }
        calResource.name = sympozerLocation.label || "";
        calResource.id    = sympozerLocation.id || "";
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
    $scope.editCalEvent = function (calEvent, jsEvent, view)
    {
        $scope.eventId = calEvent.id;
        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'modals/events-modal-form.html',
            controller : 'eventsEditCtrl',
            size       : "large",
            scope: $scope
        });
        modalInstance.result.then(function (sympozerEvent)
        {
            calEvent = eventToCalEvent(sympozerEvent,calEvent);
//            uiCalendarConfig.calendars[calendar].fullCalendar( 'renderEvent', event )
            $scope.calendarEl.fullCalendar( 'updateEvent', calEvent);
        })
    }


    $scope.events = []
    $scope.locations = [];




    locationsFact.allByConference({'mainEventId' :$routeParams.mainEventId}, function(response) {
        $scope.locations = locationsToCalResources(response.results);
        initCalendar($scope.locations);
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
    $scope.onEventClick = function( calEvent, jsEvent, view){
        console.log(calEvent.title + ' was clicked ');
        $scope.currentCalEvent = calEvent;
        var fnLink = $compile($templateCache.get("event-popover-lg.html"));
        var options = {
            content : $compile(fnLink($scope))($scope),
            placement: calEvent.start.hours()>12?'top':'bottom',
            html:true,
        };

        $(this).popover(options);
        // change the border color just for fun
        $(this).css('border', '1px solid black');
    };

    /* alert on Drop */
    $scope.onEventDrop = function(calEvent, delta, revertFunc, jsEvent, ui, view){

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


        eventsFact.update(eventsFact.serialize(calEvent));
    };

    /* alert on Resize */
    $scope.onEventResize = function(calEvent, delta, revertFunc, jsEvent, ui, view ){
        calEvent.endAt = moment(calEvent.endAt).add(delta).format();
        eventsFact.update(eventsFact.serialize(calEvent));
    };

    /* add custom event*/
    $scope.addEvent = function() {
        $scope.events.push({
            title: 'Open Sesame',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            className: ['openSesame']
        });
    };
    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };

    /* Change View */
    $scope.changeView = function(view,calendar) {
        $scope.calendarEl.fullCalendar('changeView',view);
    };

    /* Change View */
    $scope.renderCalendar = function(calendar) {
        $scope.calendarEl.fullCalendar('render', true);
    };

    /* Render Tooltip */
    $scope.eventRender = function( calEvent, element, view ) {

    };

    $scope.onMouseOver =  function(calEvent, jsEvent, view) {
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



}]);

