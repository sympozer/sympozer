'use strict';

/**
 * angular directive used to handle infinite scroll, filter and specific query on list of entities
 * use it like :
 *  <div entity-list-handler="person" offset="-20" limit="20" query="""></div>
 *
 *    @param entityListHandler                  : the name of the entity the list has to handle
 *    @param (default : -20) offset             : the starting index of the entity
 *    @param (default : 20) limit               : The number of instance to fetch
 *    @param (default : null) query             : Query filter to add
 *    @param (default : "label") orderBy        : The side of the sort (ascendent : ASC | descendent : DESC
 *    @param (optional) query                   : A string filter
 */
angular.module('sympozerApp').directive('entityListHandler', ['GLOBAL_CONFIG', '$injector', 'searchService', function (GLOBAL_CONFIG, $injector, searchService)
{
    return {
        restrict: 'A',
        link    : function (scope, element, attrs)
        {
            if (!attrs.entityListHandler)
            {
                return console.error('missing mandatory field in "entity-list-handler" directive (see doc above)');
            }

            var childEntityLbl = attrs.entityListHandler,
                reset = false
                ;

            //Initialize the options
            scope.query = attrs.query || null;
            scope.orderBy = attrs.orderBy || "label";
            scope.orderSide = attrs.orderSide || "ASC";
            scope.offset = parseInt(attrs.offset) || -20;
            scope.limit = parseInt(attrs.limit) || 20;
            scope.busy = false;
            scope.load = search;

            scope.initialize = function ()
            {
                scope.offset = -(scope.limit);
            };

            //Called when a query is type
            scope.sendQuery = function (query)
            {
                scope.initialize();
                scope.query = query;
                search(true);
            };

            //Called when an order parameters is changed
            scope.order = function (orderBy, orderSide)
            {
                scope.initialize();
                scope.orderBy = orderBy;
                scope.orderSide = orderSide;
                search(true);
            };

            scope.filter = function(){
                search(true);
            }

            function search(resetResults)
            {
                reset = resetResults;
                scope.busy = true;
                scope.offset = scope.offset + scope.limit;
                searchService.doSearch({
                    entitiesLbl: childEntityLbl,
                    entities   : scope.entities,
                    callback   : callback
                }, {
                    request  : scope.request,
                    query    : scope.query,
                    offset   : scope.offset,
                    limit    : scope.limit,
                    orderBy  : scope.orderBy,
                    filters  : scope.filters,
                    orderSide: scope.orderSide
                });
            }

            function callback(data, isFirstQuery, isLastQuery)
            {
                if (isFirstQuery && reset)
                {
                    scope.entities = [];
                }

                if (isLastQuery)
                {
                    scope.busy = false;
                }

                var items = data;

                for (var i = 0; i < items.length; i++)
                {
                    scope.entities.push(items[i]);
                }

                if (items.length > 1)
                {
                    scope.busy = false;
                }
            }
        }
    };
}]);
