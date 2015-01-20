/**
 * panel directive
 * use to handle panel component rendering
 */
angular.module('sympozerApp').directive('panel',[ 'GLOBAL_CONFIG' ,function (GLOBAL_CONFIG)
{
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            panelClass: '@',
            heading: '@',
            panelIcon: '@'
        },
        templateUrl: GLOBAL_CONFIG.app.urls.partials + 'panels/panel.html'
    }
}])