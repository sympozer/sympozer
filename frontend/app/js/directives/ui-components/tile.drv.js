/**
 * tile directive
 * use to handle tile component rendering
 * @TODO : theme replace
 */
angular.module('sympozerApp').directive('tile',[ 'GLOBAL_CONFIG' ,function (GLOBAL_CONFIG)
{
    return {
        restrict: 'E',
        scope: {
            heading: '@',
            type: '@'
        },
        transclude: true,
        templateUrl: GLOBAL_CONFIG.app.urls.partials + 'tiles/tile-generic.html',
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
}])