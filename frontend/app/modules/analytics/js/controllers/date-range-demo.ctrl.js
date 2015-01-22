'use strict'


/**
 * DatepickerDemoController controller
 */
angular.module('analyticsApp').controller('DateRangePickerDemo', ['$scope', function ($scope)
{
    $scope.drp_start = moment().subtract('days', 1).format('MMMM D, YYYY');
    $scope.drp_end = moment().add('days', 31).format('MMMM D, YYYY');
    $scope.drp_options = {
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 Days': [moment().subtract('days', 6), moment()],
            'Last 30 Days': [moment().subtract('days', 29), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
        },
        opens: 'left',
        startDate: moment().subtract('days', 29),
        endDate: moment()
    };
}])