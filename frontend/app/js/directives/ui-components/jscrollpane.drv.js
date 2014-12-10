/**
 * jscrollpane directive
 * use to handle extra scroll on block
 */
angular.module('sympozerApp').directive('jscrollpane', ['$timeout', function ($timeout)
    {
        return {
            restrict: 'A',
            scope: {
                options: '=jscrollpane'
            },
            link: function (scope, element, attr)
            {
                $timeout(function ()
                {
                    if (navigator.appVersion.indexOf("Win") != -1)
                    {
                        element.jScrollPane($.extend({mouseWheelSpeed: 20}, scope.options))
                    }
                    else
                    {
                        element.jScrollPane(scope.options);
                    }
                    element.on('click', '.jspVerticalBar', function (event)
                    {
                        event.preventDefault();
                        event.stopPropagation();
                    });
                    element.bind('mousewheel', function (e)
                    {
                        e.preventDefault();
                    });
                });
            }
        };
    }])