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
                resource    : '=sympozerAclShow',
                resourceName: '@sympozerAclShow',
//                resourceNameOverride: '@sympozerAclShowName',
                right       : '@sympozerAclRight'
            },
            link    : function (scope, element, attrs)
            {
                if (!scope.resource)
                {
                    return console.error('Cannot get ' + scope.resourceName + ' from parent scope in "sympozer-acl-show". Thus, cannot refresh rights');
                }
//                if (scope.resourceNameOverride)
//                {
//                    scope.resourceName = scope.resourceNameOverride;
//                }

                scope.resource.isAclUpToDate = false;

                //watch logged user to refresh its rights
                scope.$watch("$root.currentUser", function (newValue, oldValue, scope)
                {
                    if (newValue == oldValue)
                    { //no change
                        return;
                    }

                    if (scope.resource.isAclUpToDate)
                    { //the update has already been handled by another sympozerAclShow directive.
                        return;
                    }
                    scope.resource.isAclUpToDate = true;

                    if (!newValue || !newValue.id)
                    { //user has just logged out
                        delete scope.resource.acl;

                        scope.resource.isAclUpToDate = false;
                        return;
                    }

                    //user has just logged in
                    justLoggedIn = true;
                    //refresh context
//                    contextFact.refreshContext();

                    if (!scope.resource.$promise)
                    {
                        //use sendQuery from entity list
                        if (scope.$parent.sendQuery)
                        {
                            scope.$parent.sendQuery();
                        }
                        else
                        {
                            console.warn('Cannot get ' + scope.resourceName + ' as promise from parent scope in.');
                        }
                    }
                    else
                    {

                        // we refetch the parent promise to update the acl field
                        scope.resource.$get({})
                            .then(function ()
                            {
                                //the mainConfEvent needs to be saved in localStorage
                                if (isMainEvent(scope.resource))
                                {
                                    contextFact.setContext(scope.resource);
                                }
                                scope.resource.isAclUpToDate = false;
                            });
                    }
                });

                //watch promise acl attribute to change button style (shown, hidden or disabled)
                scope.$watch("$parent." + scope.resourceName + ".acl", function (newValue, oldValue, scope)
                {
                    if (!newValue)
                    {
                        element.hide();
                    }
                    else if (!scope.$root.currentUser || !scope.$root.currentUser.id)
                    { //hide if not logged
                        element.hide();
                    }
                    else
                    {
                        //if the current logged user has right on the entity : display the button.
                        if (sympozerAclService.isGranted(scope.resource, scope.right || defaultRightToAsk))
                        {
                            element.show();
                            //if the user has just logged in, make it pulsate!
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
                            element.hide();
                        }
                    }
                });
            }
        }
    }
]);