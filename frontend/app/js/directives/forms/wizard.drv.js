/**
 * directive to call Stepy wizard plugin : https://github.com/wbotelhos/stepy#options
 * use it like :
 * <form action="#" data-wizard class="form-horizontal ng-scope ng-isolate-scope ng-pristine ng-valid">
 *
 */
angular.module('sympozerApp').directive('wizard', ['translateFilter', function (translateFilter)
{
    var defaultOptions = {
        finishButton: false,
        titleClick  : true,
        block       : true,
        validate    : true,
        transition  : 'slide',
        translate   : translateFilter
    };
    return {
        restrict: 'A',
        link    : function (scope, element, attr)
        {
            var options = angular.extend({}, defaultOptions, scope.$eval(attr.wizard));
            element.stepy(options);

            //fix stepy translation bug
            element.prev().find("> li > span").each(function ()
            {
                $(this).text(options.translate($(this).text()));
            })
        }
    }
}]);