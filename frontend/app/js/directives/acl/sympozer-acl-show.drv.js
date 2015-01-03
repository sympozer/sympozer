/**
 * directive used to hide a div when the current logged user doesn't have enough permission
 * @param acl-right (optional) (default="OPERATOR") : the right to ask the permission for : @see sympozer-acl-service.fact.js for more informations
 *
 * use it like :
 * <a acl-show="mainEvent"  acl-right="EDIT" class="btn btn-info" href="#mainEvents/edit/{{mainEvent.id}}" role="button">
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
                scope.$watch("$parent." + scope.promiseName + ".acl", function (newValue, oldValue, $scope)
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