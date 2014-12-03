/**
 * Directive to initialize a fullCalendar instance
 * (FROM FORZA)
 *
 */
angular.module('eventsApp').directive('fullCalendar', function ()
{
    return {
        restrict: 'A',
        scope: {
            options: '=fullCalendar'
        },
        link: function (scope, element, attr)
        {
            var defaultOptions = {
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                selectable: true,
                selectHelper: true,
                select: function (start, end, allDay)
                {
                    var title = prompt('Event Title:');
                    if (title)
                    {
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
                    today: 'Today',
                    month: 'Month',
                    week: 'Week',
                    day: 'Day'
                }
            };
            $.extend(true, defaultOptions, scope.options);
            if (defaultOptions.droppable == true)
            {
                defaultOptions.drop = function (date, allDay)
                {
                    var originalEventObject = $(this).data('eventObject');
                    var copiedEventObject = $.extend({}, originalEventObject);
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
                    calendar.fullCalendar('renderEvent', copiedEventObject, true);
                    if (defaultOptions.removeDroppedEvent == true)
                    {
                        $(this).remove();
                    }
                }
            }
            var calendar = $(element).fullCalendar(defaultOptions);
        }
    };
})