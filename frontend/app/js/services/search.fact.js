/**
 * Search service
 * Handles formatting complex backend requests with queries, order, offset,limit and filter parameters
 */
angular.module('sympozerApp').factory('searchService', [
    '$timeout', function ($timeout)
    {
        var searchTimeout;
        return {

            /**
             * Send a request to the backend according to a configuration passed in parameters
             * @param arg callback to execute when responses comes back from the server
             * @param searchConfig JSON object containing :
             *   searchService.doSearch({
             *      entitiesLbl: childEntityLbl,
             *      callback: callback
             *  }, {
             *       request: a resource request function (example personsFact.all / organizationFact.all).
             *       query: a string to search for on label fields,
             *       offset: the offset to get results from,
             *       limit: the size of the result set,
             *       orderBy: the field name to order by,
             *       filters: the filter object to serialize (key /values),
             *       routeParams: the route parameters,
             *       orderSide: the side to order on (ASC / DESC)
             *   });
             *
             */
            doSearch: function (arg, searchConfig)
            {
                //avoid too many queries
                $timeout.cancel(searchTimeout);
                searchTimeout = $timeout(doSearch, 500);

                //Serialize the request and send
                function doSearch()
                {
                    //Initialize request parameters
                    var requestParams = {
                        query : searchConfig.query,
                        offset: searchConfig.offset,
                        limit : searchConfig.limit
                    };

                    //Serialize the order param
                    requestParams["order[" + searchConfig.orderBy + "]"] = searchConfig.orderSide || null;

                    //Add route parameters to request parameters
                    for (var param in searchConfig.routeParams)
                    {
                        requestParams[param] = searchConfig.routeParams[param];
                    }


                    //Serialize filters
                    for (var i in searchConfig.filters)
                    {
                        var currentFilter = searchConfig.filters[i];
                        if (currentFilter instanceof Array)
                        {
                            requestParams["filters[" + i + "]"] = [];
                            for (var value in currentFilter)
                            {
                                requestParams["filters[" + i + "]"].push(currentFilter[value]);
                            }
                        }
                        else
                        {
                            requestParams["filters[" + i + "]"] = searchConfig.filters[i];
                        }
                    }

                    //queryNb++;

                    //Send request to server
                    searchConfig.request(requestParams, success);

                    //When response from the server, trigger the callback
                    function success(data)
                    {
//                        var isFirstQuery = firstQueryNb == queryDone;
//                        queryDone++;
                        arg.callback(data);
                    }
                }
            }
        };
    }
]);

