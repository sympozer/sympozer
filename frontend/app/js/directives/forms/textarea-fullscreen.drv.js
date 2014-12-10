/**
 * directive to add a fullscreen button to textarea
 * A button is displayed in the textarea allowing the user to see the text in fullscreen
 *
 * use it like :
 * <textarea fullscreen/>
 *
 */
angular.module('sympozerApp').directive('fullscreen', function ()
{
    return {
        restrict: 'AC',
        link: function (scope, element, attr)
        {
            element.fseditor({maxHeight: 500});
        }
    }
})