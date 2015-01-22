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
        //operator right can do everything but delete the whole mainEvent
        var defaultRightToAsk = "OPERATOR",
            justLoggedIn = false;

        return {
            restrict: 'A',
            scope   : {
                promise    : '=sympozerAclShow',
                promiseName: '@sympozerAclShow',
                right      : '@sympozerAclRight'
            },
            link    : function (scope, element, attrs)
            {
                if (!scope.promise)
                {
                    return console.error('Cannot get ' + scope.promiseName + ' from parent scope in "sympozer-acl-show".');
                }

                //watch logged user to refresh rights
                scope.$watch("$root.currentUser", function (newValue, oldValue, $scope)
                {
                    if (newValue == oldValue)
                    { //no change
                        return;
                    }

                    if (!newValue || !newValue.id)
                    { //user has just logged out
                        delete $scope.promise.acl;
                        return;
                    }

                    //user has just logged in
                    justLoggedIn = true;

                    // we refetch the parent promise to update the acl field
                    $scope.promise.$get({});
                });

                //watch promise
                scope.$watch("$parent." + scope.promiseName + ".acl", function (newValue, oldValue, $scope)
                {
                    if (!newValue)
                    {
                        element.hide();
                    }

                    //hide if not logged
                    if (!$scope.$root.currentUser || !$scope.$root.currentUser.id)
                    {
                        element.hide();
                    }
                    else
                    {
                        //if the current logged user has right on the entity : display the button.
                        if (sympozerAclService.isGranted($scope.promise, $scope.right || defaultRightToAsk))
                        {
                            element.show().removeClass("disabled");
                            if (justLoggedIn)
                            {
                                $(element).pulsate({repeat: 2});
                            }
                        }
                        else
                        {
                            element.show().addClass("disabled");
                        }
                    }
                });
            }
        }
    }
]);