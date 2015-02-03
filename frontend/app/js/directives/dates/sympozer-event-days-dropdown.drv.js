/**
 * sympozerEventDaysDropdown
 * Generate a selectable dropdown with days entry calaculated from a date to another
 * use it like :
 * <div class="col-sm-6" sympozer-event-days-dropdown start="{{event.startAt}}" end="{{event.endAt}}" model="event.selectedDay">
 * @param start, a String object reprensenting the first day
 * @param end, a String object reprensenting the last day
 * @parem model, the model to update when a day is selected in the generated dropdown
 */
angular.module('sympozerApp').directive('sympozerEventDaysDropdown',['dateDaysDifferenceFact', function (dateDaysDifferenceFact)
{
    return {
        restrict: 'AE',
        template: '<select class="form-control"  data-ng-options="item.date as item.label for item in items" data-ng-change=selectDay(model) data-ng-model="model"></select>',
        scope: {
            model: '='
        },
        link: function (scope, element, attrs)
        {
            //Control if all mandatory parameters are available
            if (!attrs.end || !attrs.start )
            {
                return console.error('missing mandatory field in "sympozerEventDaysDropdown" directive (see doc above)');
            }

            scope.items = dateDaysDifferenceFact.getDaysDifference(attrs.start, attrs.end);

        }
    }
}])