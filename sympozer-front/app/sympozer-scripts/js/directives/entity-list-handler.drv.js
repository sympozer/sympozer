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
angular.module('sympozerApp').directive('entityListHandler', ['GLOBAL_CONFIG', '$routeParams', 'searchService', function (GLOBAL_CONFIG, $routeParams, searchService)
{
    return {
        restrict: 'A',
        link: function (scope, element, attrs)
        {
            if (!attrs.entityListHandler)
            {
                return console.error('missing mandatory field in "entity-list-handler" directive (see doc above)');
            }

            //Request param in scope specifies the url to use for fetching entities
            if (!scope.request)
            {
                return console.error('missing mandatory request parameter in the scope');
            }

            //The type of entity to load (papers/events/persons...)
            var childEntityLbl = attrs.entityListHandler,
                reset = false
                ;

            //Initialize the options
            //Query is a string
            scope.query = attrs.query || null;
            //orderBy is the attribute on which order has to be applied
            scope.orderBy = attrs.orderBy || "label";
            //orderSide is ASC (for ascendent) or DESC (for descendant)
            scope.orderSide = attrs.orderSide || "ASC";
            //offset is the row number to start the results set from
            scope.offset = parseInt(attrs.offset) || -20;
            //Limit is the results set size
            scope.limit = parseInt(attrs.limit) || 20;
            //Busy is use by the infinite-scroll directive to manage scroll event listenning
            scope.busy = false;

            //scope.load is the search function triggered by infinite-scroll directive when a scroll event is detected and busy is false
            scope.load = search;

            //Initialize reset all parameters
            scope.initialize = initialize;

            //put sendQuery function in scope for reuse
            scope.sendQuery = sendQuery;
            //put order function in scope for reuse
            scope.order = order;
            //put filter function in scope for reuse
            scope.filter = filter;


            //first fetch
            scope.sendQuery();
            function initialize()
            {
                scope.offset = -(scope.limit);
            }

            //Called when a query is type
            function sendQuery(query)
            {
                scope.initialize();
                scope.query = query;
                search(true);
            }

            //Called when an order parameters is changed
            function order(orderBy, orderSide)
            {
                scope.initialize();
                scope.orderBy = orderBy;
                scope.orderSide = orderSide;
                search(true);
            }

            //Called when a filter changes (scope.filters are managed by the list controller)
            function filter()
            {
                scope.initialize();
                search(true);
            }

            //Trigger the search with specified parameters.
            // The request is handled by the search service that will serialize the request
            function search(resetResults)
            {
                //param specifying if results set has to be cleared when new data received
                reset = resetResults;

                //a request is now pending, infinite-scroll stops listenning on scroll event
                scope.busy = true;

                //increasing offset
                scope.offset = scope.offset + scope.limit;

                //send request to search service with parameters
                searchService.doSearch({
                    entitiesLbl: childEntityLbl,
                    callback: callback
                }, {
                    request: scope.request,
                    query: scope.query,
                    offset: scope.offset,
                    limit: scope.limit,
                    orderBy: scope.orderBy,
                    filters: scope.filters,
                    routeParams: $routeParams,
                    orderSide: scope.orderSide
                });
            }

            //Manage the results set coming back from the server
            function callback(data)
            {
                //if reset specified, clear the data object entities
                if (reset)
                {
                    scope.entities = [];
                }


                var items = data;

                //Copy results set into scope.entities for display
                for (var i = 0; i < items.length; i++)
                {
                    scope.entities.push(items[i]);
                }

                //Infinite scroll directive starts listening on scroll event again
                if (items.length > 1)
                {
                    scope.busy = false;
                }
            }
        }
    };
}]);
