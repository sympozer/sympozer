/**
 * directive to call Stepy wizard plugin : https://github.com/wbotelhos/stepy#options
 * use it like :
 * <form action="#" data-wizard class="form-horizontal ng-scope ng-isolate-scope ng-pristine ng-valid">
 *
 */
angular.module('sympozerApp').directive('onReadFile', function ($parse)
{
    return {
        restrict: 'A',
        scope   : false,
        link    : function (scope, element, attrs)
        {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function (onChangeEvent)
            {
                var reader = new FileReader();

                reader.onload = function (onLoadEvent)
                {
                    scope.$apply(function ()
                    {
                        fn(scope, {$fileContent: onLoadEvent.target.result});
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});