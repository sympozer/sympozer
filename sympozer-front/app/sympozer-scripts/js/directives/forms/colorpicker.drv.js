/**
 * directive to display a colorpicker on a text input
 * When the input is clicked, the color picker is display.
 * When a color is selected, the input show a background color accordingly
 * use it like :
 * <input type="text" colorpicker/>
 *
 */
angular.module('sympozerApp').directive('colorpicker', function ()
{
    return {
        restrict: 'AC',
        link: function (scope, element, attr)
        {
            element.colorpicker();
        }
    }
})