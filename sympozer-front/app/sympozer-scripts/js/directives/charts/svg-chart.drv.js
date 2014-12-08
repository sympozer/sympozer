/**
 * svgChart directive
 * @TODO : decide to keep or not (from forza)
 */
angular.module('sympozerApp').directive('svgChart', function ()
{
    return {
        restrict: 'EA',
        scope: {
            options: '=svgChart',
            type: '=',
        },
        link: function (scope, element, attr)
        {
            if (Morris)
            {
                var elementId;
                if (!$(element).attr('id'))
                {
                    elementId = $(element).attr('id', scope.type + attr.svgChart);
                }
                else
                {
                    elementId = $(element).attr('id');
                }
                Morris[scope.type](angular.extend(scope.options, {element: elementId}));
            }
        }
    }
})