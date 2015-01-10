/**
 * sympozerEventDaysDropdown
 * Generate a selectable dropdown with days entry calaculated from a date to another
 * use it like :
 * <div class="col-sm-6" sympozer-event-days-dropdown start="{{event.startAt}}" end="{{event.endAt}}" model="event.selectedDay">
 * @param start, a String object reprensenting the first day
 * @param end, a String object reprensenting the last day
 * @parem model, the model to update when a day is selected in the generated dropdown
 */
angular.module('sympozerApp').directive('sympozerEventDaysDropdown',['moment', 'translateFilter', function (moment, translateFilter)
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

            //Initialize start date object from string
            var startDate = currentDay = new moment(attrs.start);
            //Initialize and date object from string
            var endDate = new moment(attrs.end);
            //Calulate interval between the two dates in days
            var daysInterval = endDate.diff(startDate, 'days');


            scope.items = []
            //Iterate day by day and create day number entries
            for(i=1; i <= daysInterval; i++){
                //Initialize new day item
                var item   = {};

                //Construct day item from the current day
                item.date  = currentDay.format('dd DD MMM YYYY');
                item.label = translateFilter( 'global.labels.day')+' '+ i + ' - '+currentDay.format('dd DD MMM');
                //Store the new item in array
                scope.items.push(item);

                //add one day to the current date
                var currentDay = currentDay.add('days', 1);
            }
        }
    }
}])