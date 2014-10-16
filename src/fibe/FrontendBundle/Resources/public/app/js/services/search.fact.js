


angular.module('sympozerApp').factory('searchService', [
    '$injector', '$timeout', function ($injector, $timeout)
    {
        var searchTimeout;
        return {

//        mandatory args : entitiesLbl, entities, callback
            doSearch: function (arg, searchConfig)
            {
                $timeout.cancel(searchTimeout);
                searchTimeout = $timeout(doSearch, 500);
                function doSearch()
                {
                    //var entityFact = $injector.get(arg.entitiesLbl + 'Fact'),
                    //    queryDone = queryNb,
                    //    firstQueryNb = queryNb;
//                    arg.busy = true;
                    var requestParams = {};
                    if (searchConfig.orderBy)
                    {
                        requestParams["order[" + searchConfig.orderBy + "]"] = searchConfig.orderSide;
                    }

                    for (var i in searchConfig.filters)
                    {
                        var currentFilter = searchConfig.filters[i];
                        if(currentFilter instanceof Array){
                            requestParams["filters[" + i + "]"] = [];
                            for (var value in currentFilter) {
                                requestParams["filters[" + i + "]"].push(currentFilter[value]);
                            }
                        }else{
                            requestParams["filters[" + i + "]"] = searchConfig.filters[i];
                        }
                    }

                    queryNb++;
                    searchConfig.request(requestParams, success);

                    function success(data)
                    {
                        var isFirstQuery = firstQueryNb == queryDone;
                        queryDone++;
                        arg.callback(data, isFirstQuery, queryNb == queryDone);
                    }
                }
            }
        };
    }
]);

