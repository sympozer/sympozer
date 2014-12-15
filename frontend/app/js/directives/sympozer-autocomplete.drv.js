/**
 * Directive for autocompletion for entity links
 * use it like :
 *
 *  <div sympozer-autocomplete="organizations" on-select="addOrganization" on-keyup="searchOrganizations"></div>
 *
 *  the template is loaded dynamicaly like :
 *  GLOBAL_CONFIG.app.modules[sympozer-autocomplete].urls.partials + entity + '-select.html';
 *
 *    @param sympozer-autocomplete : plural name of the entity to propose in the autocomplete (used to get the "select" template dynamicaly)
 *    @param on-select             : Function to trigger when a selection is done
 *    @param on-keyup             : Function to trigger when the user type a research
 */
angular.module('sympozerApp').directive('sympozerAutocomplete', [
    'GLOBAL_CONFIG', '$q', '$routeParams', function (GLOBAL_CONFIG, $q, $routeParams)
    {
        return {
            template: '<div ng-include="templateUrl" ></div>',
            scope   : {
                onSelect: "=",
                onKeyup : "="
            },

            link: function (scope, element, attrs)
            {
                if (!attrs.sympozerAutocomplete)
                {
                    return console.error('missing mandatory field in "sympozer-autocomplete" directive (see doc above)');
                }

                scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
                scope.searchedEntity = attrs.sympozerAutocomplete;
                scope.templateUrl = GLOBAL_CONFIG.app.modules[scope.searchedEntity].urls.partials + scope.searchedEntity + '-select.html';

                /**
                 * fired when the keyboard is hit
                 * @param query
                 */
                scope.keyup = function (query)
                {
                    //Prepare the parameters for the request
                    var requestParams = {};
                    requestParams.query = query;

                    //Add route parameters to object for request
                    for (var param in $routeParams)
                    {
                        requestParams[param] = $routeParams[param];
                    }

                    //Promise needed by the typeahead directive, resolved when something is typed
                    var deferred = $q.defer();
                    scope.onKeyup(requestParams, function (data)
                    {
                        data.results.push({label: ""});
                        deferred.resolve(data.results);
                    });
                    return deferred.promise;
                };

                /**
                 * fired when a selection is done on the autocomplete list
                 * @param $item represents the selected item
                 */
                scope.select = function ($item)
                {
                    if($item){
                        //Trigger the onSelect from the controller responsible for the view
                        scope.onSelect($item);
                    }


                }
            }
        };


    }]);


