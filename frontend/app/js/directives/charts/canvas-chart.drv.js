/**
 * canvasChart directive
 * @TODO : decide to keep or not (from forza)
 */
angular.module('sympozerApp').directive('canvasChart', function ()
{
    return {
        restrict: 'EA',
        scope: {
            data: '=canvasChart',
            options: '=options',
            type: '='
        },
        link: function (scope, element, attr)
        {
            if (Chart)
            {
                // console.log(element[0].getContext);
                (new Chart($(element)[0].getContext('2d')))[scope.type](scope.data, scope.options);
            }
        }
    }
})
