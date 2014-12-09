/**
 * tile large directive
 * use to handle tile large component rendering
 * @TODO : find a better way to manage template (from forza)
 */
angular.module('sympozerApp').directive('tileLarge', function ()
{
    return {
        restrict: 'E',
        scope: {
            item: '=data'
        },
        templateUrl: 'templates/tile-large.html',
        replace: true,
        transclude: true
    }
})