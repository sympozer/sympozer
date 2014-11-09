/**
 * directive used to hide a div when the current logged user doesn't have enough permission
 *
 * use it like :
 * <a acl-show="mainEvent" class="btn btn-info" href="#mainEvents/edit/{{mainEvent.id}}" role="button">
 *
 */
angular.module('sympozerApp').directive('sympozerAclShow', [
    'sympozerAclService', function (sympozerAclService)
    {
        var defaultRightToAsk = "OPERATOR";

        return {
            restrict: 'A',
            scope   : {
                promise    : '=sympozerAclShow',
                promiseName: '@sympozerAclShow',
                right      : '@sympozerAclRight'
            },
            link    : function (scope, element, attrs)
            {
                //default is to hide button
                element.hide();
                //watch acl attribute
                var fieldToWatch = "$parent." + scope.promiseName + ".acl";

                scope.$watch(fieldToWatch, function (newValue, oldValue, $scope)
                {
                    //not at initialization
                    if (!newValue)
                    {
                        return;
                    }

                    if (sympozerAclService.isGranted($scope.promise, $scope.right || defaultRightToAsk))
                    {
                        element.show();
                    }
                    else
                    {
                        element.hide();
                    }
                })
            }
        }
    }
]);