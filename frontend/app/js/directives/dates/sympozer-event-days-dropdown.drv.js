/**
 * sympozerEventDaysDropdown
 * Generate a selectable dropdown with days entry calaculated from a date to another
 * use it like :
 * <div class="col-sm-6" sympozer-event-days-dropdown start="{{event.startAt}}" end="{{event.endAt}}" model="event.selectedDay">
 * @param start, a String object reprensenting the first day
 * @param end, a String object reprensenting the last day
 * @parem model, the model to update when a day is selected in the generated dropdown
 */
angular.module('sympozerApp').directive('sympozerEventDaysDropdown',['dateDaysDifferenceFact', 'translateFilter', function (dateDaysDifferenceFact, translateFilter)
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

            //Get an array of all day from the start day to end day
            scope.items = dateDaysDifferenceFact.getDaysDifference(attrs.start, attrs.end);

            //Add a no date item
            scope.items.push({ 'date' : null, 'label' : translateFilter( 'global.labels.undefined'), 'id' : -1});


        }
    }
}])