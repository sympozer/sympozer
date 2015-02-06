/**
 * This is basically an extension of the ngInclude directive
 * to allow you to pass renamed variables in from the parent scope.
 * ngInclude is NOT required at all, but this directive has been designed to work well with it.
 *
 * You can attach any number of locals-* attributes, which will all be parsed & watched for you as
 *
 * use it like :
 * <div class="row"
 *      ng-include="GLOBAL_CONFIG.app.modules.persons.urls.partials+'views/persons-entity-row-lg.html'"
 *      sympozer-with-locals locals-person="teammate.person"
 *      ></div>
 *  in example to access the "teammate.person" as {{ person }} in this directive scope
 */
angular.module('sympozerApp').directive('sympozerWithLocals', function ($parse)
{
    return {
        scope  : true,
        compile: function (element, attributes, transclusion)
        {
            // for each attribute that matches locals-* (camelcased to locals[A-Z0-9]),
            // capture the "key" intended for the local variable so that we can later
            // map it into $scope.locals (in the linking function below)
            var mapLocalsToParentExp = {};
            for (attr in attributes)
            {
                if (attributes.hasOwnProperty(attr) && /^locals[A-Z0-9]/.test(attr))
                {
                    var localKey = attr.slice(6);
                    localKey = localKey[0].toLowerCase() + localKey.slice(1);

                    mapLocalsToParentExp[localKey] = attributes[attr];
                }
            }
            //bidirectional update
//                var updateParentValueFunction = function($scope, localKey) {
//                    // Find the $parent scope that initialized this directive.
//                    // Important in cases where controllers have caused this $scope to be deeply nested inside the original parent
//                    var $parent = $scope.$parent;
//                    while ($parent && !$parent.hasOwnProperty(mapLocalsToParentExp[localKey].slice(0,mapLocalsToParentExp[localKey].indexOf(".")))) {
//                        $parent = $parent.$parent;
//                    }
//
//                    return function(newValue) {
//                        $parse(mapLocalsToParentExp[localKey]).assign($parent, newValue);
//                    }
//                };

            return {
                pre: function ($scope, $element, $attributes)
                {

                    // setup `$scope.locals` hash so that we can map expressions
                    // from the parent scope into it.
                    $scope.locals = {};
                    for (localKey in mapLocalsToParentExp)
                    {

                        // For each local key, $watch the provided expression and update
                        // the $scope.locals hash (i.e. attribute `locals-cars` has key
                        // `cars` and the $watch()ed value maps to `$scope.locals.cars`)
                        $scope.$watch(
                            mapLocalsToParentExp[localKey],
                            function (localKey)
                            {
                                return function (newValue, oldValue)
                                {
                                    $scope[localKey] = newValue;
                                };
                            }(localKey),
                            true
                        );

//                            // bidirectional update
//                            // Also watch the local value and propagate any changes
//                            // back up to the parent scope.
//                            var parsedGetter = $parse(mapLocalsToParentExp[localKey]);
//                            if (parsedGetter.assign) {
//                                $scope.$watch(localKey, updateParentValueFunction($scope, localKey));
//                            }

                    }
                }
            };
        }
    };
});