/**
 * slideOutNav directive
 * effect of left nav collapsible
 * @TODO : Theme replace
 */
angular.module('sympozerApp').directive('slideOutNav', ['$timeout', function ($t)
{
    return {
        restrict: 'A',
        scope: {
            show: '=slideOutNav'
        },
        link: function (scope, element, attr)
        {
            scope.$watch('show', function (newVal, oldVal)
            {
                if ($('body').hasClass('collapse-leftbar'))
                {
                    if (newVal == true)
                    {
                        element.css('display', 'block');
                    }
                    else
                    {
                        element.css('display', 'none');
                    }
                    return;
                }
                if (newVal == true)
                {
                    element.slideDown({
                        complete: function ()
                        {
                            $t(function ()
                            {
                                scope.$apply()
                            })
                        }
                    });
                }
                else if (newVal == false)
                {
                    element.slideUp({
                        complete: function ()
                        {
                            $t(function ()
                            {
                                scope.$apply()
                            })
                        }
                    });
                }
            });
        }
    }
}])