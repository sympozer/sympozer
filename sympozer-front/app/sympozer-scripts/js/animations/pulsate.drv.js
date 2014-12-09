/**
 * pulsate directive
 * effect of surrounding an element repeatidly
 * @TODO : Define a proper animation, not a directive
 */
angular.module('sympozerApp').directive('pulsate', function ()
{
    return {
        scope: {
            pulsate: '='
        },
        link: function (scope, element, attr)
        {
            // stupid hack to prevent FF from throwing error
            if (element.css('background-color') == "transparent")
            {
                element.css('background-color', "rgba(0,0,0,0.01)");
            }
            $(element).pulsate(scope.pulsate);
        }
    }
})