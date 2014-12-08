/**
 * directive for automatic resize of textarea form control
 * When user enter text in a textarea, the textarea grows woth the text
 *
 * use it like :
 * <textarea autosize/>
 *
 */
angular.module('sympozerApp').directive('autosize', function ()
{
    return {
        restrict: 'AC',
        link: function (scope, element, attr)
        {
            element.autosize({append: "\n"})
        }
    }
})