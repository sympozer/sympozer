/**
 * panel directive
 * use to handle panel component rendering
 */
angular.module('sympozerApp').directive('panel', function ()
{
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            panelClass: '@',
            heading: '@',
            panelIcon: '@'
        },
        templateUrl: 'templates/panel.html'
    }
})