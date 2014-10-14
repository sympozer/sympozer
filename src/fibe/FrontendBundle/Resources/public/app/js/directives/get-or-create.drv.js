
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
angular.module('sympozerApp').directive('getOrCreate', [
    'GLOBAL_CONFIG', 'createDialog', 'searchService', '$injector', function (GLOBAL_CONFIG, createDialogService, searchService, $injector)
    {
        return {
            template: '<div ng-include="templateUrl"></div>',
            scope   : true,
            link    : function (scope, element, attrs)
            {
                if (!attrs.getOrCreate || !attrs.parentEntity)
                {
                    return console.error('missing mandatory field in "get-or-create" directive (see doc above)');
                }
                if (attrs.newPolitic && ["none", "modal", "create"].indexOf(attrs.newPolitic) < 0)
                {
                    return console.error('wrong value for parameter "new-politic" in "getOrCreate" directive (see doc above)');
                }

                var uniqField = attrs.uniqField || 'label',
                    childEntityLbl = attrs.getOrCreate,
                    parentEntityLbl = attrs.parentEntity,
                    singleChoice = attrs.singlechoice,
                    mainEventId = attrs.mainEventId,
                    singleChoiceChild = attrs.singleChoiceChild,
                    parentField = attrs.parentField || (!singleChoice ? getPlural(childEntityLbl) : childEntityLbl),
                    childField = attrs.childField || (!singleChoiceChild ? getPlural(parentEntityLbl) : parentEntityLbl),

                    newPolitic = attrs.newPolitic || "create",
                    required = attrs.required,


                    childEntitiesLbl = getPlural(childEntityLbl),
                    childEntityLblCamelCase = childEntityLbl.charAt(0).toUpperCase() + childEntityLbl.slice(1),
                    entityFact = $injector.get(childEntitiesLbl + 'Fact'),
                    formDialogTemplateUrl = GLOBAL_CONFIG.app.modules[childEntitiesLbl].urls.partials + childEntitiesLbl + '-form.html',

                    limit = 10,
                    resetChoices = true
                    ;

                scope.templateUrl = GLOBAL_CONFIG.app.modules[childEntitiesLbl].urls.partials + childEntitiesLbl + '-select.html';
                //the entity binded with ng-model to the input
                scope.addedEntity = {};
                scope.addedEntity[uniqField] = "";
                //available entities in the choice list
                scope.entities = [];
                scope.singleChoice = singleChoice;
                scope.mainEventId = mainEventId;
                scope.parentField = parentField;
                scope.required = required;

                scope.filters =  attrs.filters ? JSON.parse(attrs.filters) :'' ;

                //resolve the parent resource given by attrs.entity. The second test is for an embedded modal
                scope.resource = scope.$parent[parentEntityLbl] || scope.$parent.$parent.$parent.$entity;
                if (!scope.resource)
                {
                    return console.error('Could not have resolved scope of entity' + parentEntityLbl);
                }


//                if (!scope.resource[parentField])
//                {
//                    if (!singleChoice)
//                    {
//                        scope.resource[parentField] = [];
//                    }
//                    else
//                    {
//                        scope.resource[parentField] = {};
//                    }
//                }

                /**
                 * fired when the keyboard is hit
                 * @param $event
                 */
                scope.keyup = function ($event)
                {
                    if ($event.target.value == scope.addedEntity[uniqField])
                    {
                        return;
                    }

                    var query = scope.addedEntity[uniqField] = $event.target.value;

                    if ($event.target.value === "")
                    {
                        return;
                    }

                    doSearch(query);

                };

                /**
                 * fired when a choice is selected
                 * -  auto fill the child's field referring to its parent
                 * @param $model
                 */
                scope.change = function ($model)
                {
                    if (!$model[uniqField])
                    {
                        scope.entities = [];
                        return;
                    }

                    var newEntity = new entityFact($model);
                    if ($model.id)
                    {
                        addChildEntity(newEntity);
                    }
                    else
                    {
                        switch (newPolitic)
                        {
                            case "create":
                                //Creation of the new entity
                                scope.busy = true;
                                createChildEntity(newEntity);

                                break;

                            case "modal":

                                var successFn = function ()
                                {
                                    createChildEntity(newEntity);
                                };

                                if (singleChoiceChild)
                                {
                                    $model[childField] = scope.resource;
                                }
                                else
                                {
                                    $model[childField] = [];
                                    $model[childField].push(scope.resource);
                                }

                                createEntityModal(newEntity, successFn);
                                break;

                        }
                    }
                    $model[uniqField] = "";
                    scope.entities = [];
                };

                scope.deleteEntity = function (index, entity)
                {
                    if (!singleChoice)
                    {
                        scope.resource[parentField].splice(index, 1);
                    }
                    else
                    {
                        scope.resource[parentField] = {};
                    }
                };
                /**
                 * show a modal if the entity doesn't exists
                 * @param newEntity
                 * @param successFn
                 */
                function createEntityModal(newEntity, successFn)
                {
                    var dialogCtrlArgs = {
                        scope                : {
                            $entityLbl: childEntityLbl,
                            formId    : childEntityLbl + "-form",
                            $entity   : newEntity
                        },
                        formDialogTemplateUrl: formDialogTemplateUrl
                    };
                    dialogCtrlArgs.scope[childEntityLbl] = newEntity;
                    var dialogOptions = {
                        id        : 'complexDialog',
                        title     : childEntityLblCamelCase + ' creation',
                        backdrop  : true,
                        controller: 'genericDialogCtrl',
                        success   : {label: 'Ok', fn: successFn},
                        cancel    : {label: 'Cancel', fn: function ()
                        {
                            console.log("cancelled", newEntity);
                        }}
                    };
                    createDialogService(GLOBAL_CONFIG.app.urls.partials + 'layout/generic-dialog.html', dialogOptions, dialogCtrlArgs);
                }

                /**
                 * make the request to post createdEntity and add a link to it from the parent
                 * @param createdEntity
                 */
                function createChildEntity(createdEntity)
                {

                    var success = function (createdEntity)
                    {
                        scope.busy = false;
                        scope.$root.$broadcast('AlertCtrl:addAlert', {code: childEntityLbl + ' created', type: 'success'});
                        addChildEntity(createdEntity)
                    };

                    var error = function (response, args)
                    {
                        scope.busy = false;
                        scope.$root.$broadcast('AlertCtrl:addAlert', {code: 'the ' + childEntityLbl + ' has not been created', type: 'danger'});
                    };

                    createdEntity.mainEvent = scope.mainEventId;
                    createdEntity.$create({}, success, error);
                }

                function addChildEntity(childEntity)
                {
                    console.log("validated", childEntity);
                    if (singleChoice)
                    {
                        scope.resource[parentField] = childEntity;
                    }
                    else
                    {
                        if (!scope.resource[parentField])
                        {
                            scope.resource[parentField] = [];
                        }
                        scope.resource[parentField].push(childEntity);
                    }
                }

//                /**
//                 * executes queries
//                 * @param query
//                 */
                function doSearch(query)
                {

                    scope.offset = scope.offset + scope.limit;
                    searchService.doSearch({
                        entitiesLbl: childEntitiesLbl,
                        entities   : scope.entities,
                        callback   : addChoices,
                        busy       : scope.busy
                    }, {
                        query    : query,
                        limit    : limit,
                        offset   : -(limit),
                        filters  : scope.filters,
                        orderBy  : uniqField,
                        orderSide: "ASC"
                    });
                }

//                /**
//                 * executes queries
//                 * @param query
//                 */
//                function doSearch(query)
//                {
//                    scope.busy = true;
//                    resetChoices = true;
//                    //closure to copy by value
//                    entityFact.all({limit: limit, query: query}, function (data)
//                    {
//                        addChoices(data, query);
//                    });
//
//                    console.log("get by conference");
//                    if (entityFact.allByConference)
//                    {
//                        entityFact.allByConference({limit: limit, query: query}, function (data)
//                        {
//                            addChoices(data, query);
//                        });
//                    }
//                }

                /**
                 * add fetch results to the select menu
                 * -  prevent duplicates thanks to uniqField
                 * -  reset select list if resetChoices = true
                 *
                 * @param data  results
                 * @param q     the original query
                 */
                function addChoices(data, isFirstRequest, isLastRequest)
                {

                    if (isFirstRequest)
                    {
                        scope.entities = [];
                    }

                    for (var i = 0; i < data.length; i++)
                    {

                        if (singleChoice && containsEntity(scope.resource[parentField], data[i]))
                        {
                            continue;
                        }
                        else if (containsEntity(scope.resource[parentField], data[i]))
                        {
                            continue;
                        }

                        scope.entities.push(data[i]);
                    }

                    if (newPolitic !== "none"
                        && !containsEntity(scope.entities, scope.addedEntity)
                        && !containsEntity(scope.resource[parentField], scope.addedEntity)
                        && isLastRequest)
                    {
                        scope.entities.push(scope.addedEntity);
                    }
                }

                function containsEntity(entities, entity)
                {
                    if (!entities)
                    {
                        return false;
                    }
                    else if (entities instanceof Array)
                    {
                        for (var i in entities)
                        {
                            if (entities[i][uniqField] === entity[uniqField])
                            {
                                return true;
                            }
                        }
                    }
                    else if (entities[uniqField] === entity[uniqField])
                    {
                        return true;
                    }

                    return false;
                }

                function getPlural(childEntityLbl)
                {

                    if (childEntityLbl.slice(-1) === 'y')
                    {
                        return childEntityLbl.substring(0, childEntityLbl.length - 1) + "ies";
                    }
                    else
                    {
                        return childEntityLbl + "s";
                    }

                }
            }
        };
    }]);

