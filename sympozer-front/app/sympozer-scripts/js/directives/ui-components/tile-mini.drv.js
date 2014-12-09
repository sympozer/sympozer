/**
 * tile mini directive
 * use to handle tile mini component rendering
 * @TODO : find a better way to manage template (from forza)
 */
angular.module('sympozerApp').directive('tileMini', function ()
{
    return {
        restrict: 'E',
        scope: {
            item: '=data'
        },
        replace: true,
        templateUrl: 'templates/tile-mini.html'
    }
})