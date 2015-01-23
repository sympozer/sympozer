/**
 * directive used to hide a div when the current logged user doesn't have enough permission
 * @param acl-right (optional) (default="OPERATOR") : the right to ask the permission for : @see sympozer-acl-service.fact.js for more informations
 *
 * use it like :
 * <a acl-show="mainEvent"  acl-right="EDIT" class="btn btn-info" href="#mainEvents/edit/{{mainEvent.id}}" role="button">
 *
 */
angular.module('sympozerApp').directive('sympozerAclShow', [
    'sympozerAclService',
    'contextFact',
    function (sympozerAclService, contextFact)
    {
        //operator right can do everything but delete the whole mainEvent
        var defaultRightToAsk = "OPERATOR",
            justLoggedIn = false,
            isMainEvent = function (entity)
            {
                return entity.dtype && entity.dtype == "MainEvent";
            };

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

                scope.promise.isAclUpToDate = false;

                //watch logged user to refresh its rights
                scope.$watch("$root.currentUser", function (newValue, oldValue, $scope)
                {
                    if (newValue == oldValue)
                    { //no change
                        return;
                    }

                    if ($scope.promise.isAclUpToDate)
                    { //the update has already been handled by another sympozerAclShow directive.
                        return;
                    }
                    $scope.promise.isAclUpToDate = true;

                    if (!newValue || !newValue.id)
                    { //user has just logged out
                        delete $scope.promise.acl;

                        $scope.promise.isAclUpToDate = false;
                        return;
                    }

                    //user has just logged in
                    justLoggedIn = true;
                    //refresh context
//                    contextFact.refreshContext();

                    // we refetch the parent promise to update the acl field
                    $scope.promise.$get({})
                        .then(function ()
                        {
                            //the mainConfEvent needs to be saved in localStorage
                            if (isMainEvent($scope.promise))
                            {
                                contextFact.setContext($scope.promise);
                            }
                            $scope.promise.isAclUpToDate = false;
                        });
                });

                //watch promise acl attribute to change button style (shown, hidden or disabled)
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
                                //wait before all other directive are processed to change this shared value.
                                setTimeout(function ()
                                {
                                    justLoggedIn = false;
                                }, 100)
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