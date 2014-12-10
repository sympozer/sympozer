/**
 * tile directive
 * use to handle tile component rendering
 */
angular.module('sympozerApp').directive('tile', function ()
{
    return {
        restrict: 'E',
        scope: {
            heading: '@',
            type: '@'
        },
        transclude: true,
        templateUrl: 'templates/tile-generic.html',
        link: function (scope, element, attr)
        {
            var heading = element.find('tile-heading');
            if (heading.length)
            {
                heading.appendTo(element.find('.tiles-heading'));
            }
        },
        replace: true
    }
})