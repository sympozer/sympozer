/**
 * icheck directive
 * use to handle i check plugin for checkboxes
 */
angular.module('sympozerApp').directive('icheck', function ($timeout, $parse)
{
    return {
        require: '?ngModel',
        link: function ($scope, element, $attrs, ngModel)
        {
            return $timeout(function ()
            {
                var parentLabel = element.parent('label');
                if (parentLabel.length)
                {
                    parentLabel.addClass('icheck-label');
                }
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function (newValue)
                {
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_minimal-blue',
                    radioClass: 'iradio_minimal-blue'

                }).on('ifChanged', function (event)
                {
                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel'])
                    {
                        $scope.$apply(function ()
                        {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel'])
                    {
                        return $scope.$apply(function ()
                        {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }
    };
})