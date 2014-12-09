/**
 * panel control directive
 */
angular.module('sympozerApp').directive('panelControls', [function ()
{
    return {
        restrict: 'E',
        require: '?^tabset',
        link: function (scope, element, attrs, tabsetCtrl)
        {
            var panel = $(element).closest('.panel');
            if (panel.hasClass('.ng-isolate-scope') == false)
            {
                $(element).appendTo(panel.find('.options'));
            }
        }
    };
}])
