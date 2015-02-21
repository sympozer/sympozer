/**
 * Search service
 * Handles formatting complex backend requests with queries, order, offset,limit and filter parameters
 */
angular.module('sympozerApp').factory('dateDaysDifferenceFact', [ 'moment', 'translateFilter',
    function (moment, translateFilter)
    {
        return {

            /**
             * Construct an object containing the days available between two dates
             * @param start
             * @param end
             */
            getDaysDifference : function (start, end)
            {

                //Initialize start date object from string
                var startDate = currentDay = new moment(start);
                //Initialize and date object from string
                var endDate = new moment(end);
                //Calulate interval between the two dates in days
                var daysInterval = endDate.diff(startDate, 'days');


                var items = []
                //Iterate day by day and create day number entries
                for(i=1; i <= daysInterval+1; i++){
                    //Initialize new day item
                    var item   = {};

                    //Construct day item from the current day
                    item.date  = currentDay.format('dd DD MMM YYYY');
                    item.label = translateFilter( 'global.labels.day')+' '+ i + ' - '+currentDay.format('dd DD MMM');
                    //Store the new item in array
                    items.push(item);

                    //add one day to the current date
                    var currentDay = currentDay.add('days', 1);
                }

                return items;
            }
        };
    }
]);

