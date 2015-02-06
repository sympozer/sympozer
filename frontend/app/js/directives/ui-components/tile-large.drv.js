/**
 * tile large directive
 * use to handle tile large component rendering
 * @TODO : theme replace
 */
angular.module('sympozerApp').directive('tileLarge', [ 'GLOBAL_CONFIG', function (GLOBAL_CONFIG)
{
    return {
        restrict: 'E',
        scope: {
            item: '=data'
        },
        templateUrl:  GLOBAL_CONFIG.app.urls.partials + 'tiles/tile-large.html',
        replace: true,
        transclude: true
    }
}])