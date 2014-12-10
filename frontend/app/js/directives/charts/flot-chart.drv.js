/**
 * flotChart directive
 * @TODO : decide to keep or not (from forza)
 */
angular.module('sympozerApp').directive('flotChart', function ()
{
    return {
        restrict: 'AE',
        scope: {
            data: '=flotData',
            options: '=flotOptions',
            plothover: '&plotHover',
            plotclick: '&plotClick'
        },
        link: function (scope, element, attr)
        {
            var plot = $.plot($(element), scope.data, scope.options);

            $(element).bind('plothover', function (event, position, item)
            {
                scope.plothover({
                    event: event,
                    position: position,
                    item: item
                });
            });

            $(element).bind('plotclick', function (event, position, item)
            {
                scope.plotclick({
                    event: event,
                    position: position,
                    item: item
                });
            });

            scope.$watch('data', function (newVal, oldVal)
            {
                plot.setData(newVal);
                plot.draw();
            });

            scope.$watch('options', function (newVal, oldVal)
            {
                plot = $.plot($(element), scope.data, newVal);
            }, true);
        }
    }
})
