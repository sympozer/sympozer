
/**
 * angular directive used to show a form inside a parent form for a collection of global entities such as topics
 *
 * use it like :
 *  <div get-or-create="person" parent-entity="paper" parent-field="author" uniq-field="email" new-politic="modal"></div>
 *
 *  the template is loaded dynamicaly like :
 *  GLOBAL_CONFIG.app.modules[entity].urls.partials + entity + '-select.html';
 *
 *
 *    @param get-or-create        : the name of the entity that belongs to its parent
 *    @param parent-entity        : the name of the parent entity that owns entities
 *
 *    @param uniq-field           : (default='label') a unique field identifying the object
 *                                            (mustn't be the id because it's not known til persisted server-side)
 *    @param new-politic          : (default='create') none|modal|create the politic when an unknown entity is added
 *    @param parent-field         : (default=%entity%) the key of the parent entity refering to the entity
 *    @param child-field          : (default=%entity%) the name of the child entity relation to the parent entity
 *    @param single-choice        : (default=false) Does the parent own only one child ?
 *    @param main-event-id        : (default=null) Define the main event id to add to created entity
 *    @param single-choice-child  : (default=false) Does the child own only one parent ?
 *    @param required             : (default=false) must this field be required ?
 */
angular.module('sympozerApp').directive('sympozerAutocomplete', [
    'GLOBAL_CONFIG', 'createDialog', 'searchService', '$injector', function (GLOBAL_CONFIG, createDialogService, searchService, $injector)
    {
        return {
            template: '<div ng-include="templateUrl"></div>',
            scope   : {
                onSelect: "=",
                onKeyup: "="
            },

            link    : function (scope, element, attrs)
            {
                if (!attrs.sympozerAutocomplete)
                {
                    return console.error('missing mandatory field in "get-or-create" directive (see doc above)');
                }

                scope.searchedEntity = attrs.sympozerAutocomplete;
                scope.templateUrl = GLOBAL_CONFIG.app.modules[scope.searchedEntity].urls.partials + scope.searchedEntity + '-select.html';


                /**
                 * fired when the keyboard is hit
                 * @param $event
                 */
                scope.keyup = function ($event)
                {
                    debugger;

                    if ($event.target.value === "")
                    {
                        return;
                    }

                    scope.onKeyup({query : $event.target.value}, function(data){
                        addResults(data);
                    });
                };

                /**
                 * add fetch results to the select menu
                 * -  prevent duplicates thanks to uniqField
                 * -  reset select list if resetChoices = true
                 *
                 * @param data  results
                 * @param q     the original query
                 */
                function addResults(data, isFirstRequest, isLastRequest)
                {
                    scope.entities = [];
                    scope.entities.push("new");
                    for (var i = 0; i < data.length; i++)
                    {
                        scope.entities.push(data[i]);
                    }
                }
            }
        };
    }]);

