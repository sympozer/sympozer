/**
 * Directive to configure drag and drop on event objects for fullCalendar
 * (FROM FORZA)
 */
angular.module('eventsApp').directive('draggableEvent', function ()
{
    return {
        restrict: 'A',
        scope: {
            eventDef: '=draggableEvent'
        },
        link: function (scope, element, attr)
        {
            $(element).draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0
            });
            $(element).data('eventObject', scope.eventDef);
        }
    };
})