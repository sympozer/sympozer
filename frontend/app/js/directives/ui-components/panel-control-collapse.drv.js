/**
 * panelControlCollapse directive
 * use to handle collapsible open/close events
 */
angular.module('sympozerApp').directive('panelControlCollapse', function ()
{
    return {
        restrict: 'EAC',
        link: function (scope, element, attr)
        {
            element.bind('click', function ()
            {
                $(element).toggleClass("fa-chevron-down fa-chevron-up");
                $(element).closest(".panel").find('.panel-body').slideToggle({duration: 200});
                $(element).closest(".panel-heading").toggleClass('rounded-bottom');
            })
            return false;
        }
    };
})