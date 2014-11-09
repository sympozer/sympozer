'use strict'

angular.module('theme.calendars', [])
  .controller('CalendarController', ['$scope', '$global', function ($scope, $global) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.demoEvents = [
      {
        title: 'All Day Event',
        start: new Date(y, m, 8),
        backgroundColor: $global.getBrandColor('warning')
      },
      {
        title: 'Long Event',
        start: new Date(y, m, d-5),
        end: new Date(y, m, d-2),
        backgroundColor: $global.getBrandColor('success')
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d-3, 16, 0),
        allDay: false,
        backgroundColor: $global.getBrandColor('primary')
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: new Date(y, m, d+4, 16, 0),
        allDay: false,
        backgroundColor: $global.getBrandColor('danger')
      },
      {
        title: 'Meeting',
        start: new Date(y, m, d, 10, 30),
        allDay: false,
        backgroundColor: $global.getBrandColor('info')
      },
      {
        title: 'Lunch',
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d, 14, 0),
        allDay: false,
        backgroundColor: $global.getBrandColor('midnightblue')
      },
      {
        title: 'Birthday Party',
        start: new Date(y, m, d+1, 19, 0),
        end: new Date(y, m, d+1, 22, 30),
        allDay: false,
        backgroundColor: $global.getBrandColor('primary')
      },
      {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://google.com/',
        backgroundColor: $global.getBrandColor('warning')
      }
    ];

    $scope.events = [
        {title: 'Demo Event 1'}, {title: 'Demo Event 2'}, {title: 'Demo Event 2'}
    ];
    $scope.addEvent = function () {
        $scope.events.push({ title: $scope.newEvent });
        $scope.newEvent = '';
    };
  }])
  .directive('fullCalendar', function () {
    return {
      restrict: 'A',
      scope: {
        options: '=fullCalendar'
      },
      link: function (scope, element, attr) {
        var defaultOptions = {
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          selectable: true,
          selectHelper: true,
          select: function(start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
              calendar.fullCalendar('renderEvent',
                {
                  title: title,
                  start: start,
                  end: end,
                  allDay: allDay
                },
                true // make the event "stick"
              );
            }
            calendar.fullCalendar('unselect');
          },
          editable: true,
          events: [],
          buttonText: {
            prev: '<i class="fa fa-angle-left"></i>',
            next: '<i class="fa fa-angle-right"></i>',
            prevYear: '<i class="fa fa-angle-double-left"></i>',  // <<
            nextYear: '<i class="fa fa-angle-double-right"></i>',  // >>
            today:    'Today',
            month:    'Month',
            week:     'Week',
            day:      'Day'
          }
        };
        $.extend(true, defaultOptions, scope.options);
        if (defaultOptions.droppable == true) {
          defaultOptions.drop = function(date, allDay) {
            var originalEventObject = $(this).data('eventObject');
            var copiedEventObject = $.extend({}, originalEventObject);
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            calendar.fullCalendar('renderEvent', copiedEventObject, true);
            if (defaultOptions.removeDroppedEvent == true)
              $(this).remove();
          }
        }
        var calendar = $(element).fullCalendar(defaultOptions);
      }
    };
  })
  .directive('draggableEvent', function () {
    return {
      restrict: 'A',
      scope: {
        eventDef: '=draggableEvent'
      },
      link: function (scope, element, attr) {
        $(element).draggable({
          zIndex: 999,
          revert: true,
          revertDuration: 0
        });
        $(element).data('eventObject', scope.eventDef);
      }
    };
  })
