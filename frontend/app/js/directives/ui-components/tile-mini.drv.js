/**
 * tile mini directive
 * use to handle tile mini component rendering
 */
angular.module('sympozerApp').directive('tileMini', [ 'GLOBAL_CONFIG', function (GLOBAL_CONFIG)
{
    return {
        restrict: 'E',
        scope: {
            item: '=data'
        },
        replace: true,
        templateUrl:  GLOBAL_CONFIG.app.urls.partials + 'tiles/tile-large.html'
    }
}])