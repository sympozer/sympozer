

//mandatory args for searchService.doSearch() : entitiesLbl, callback

angular.module('sympozerApp').factory('searchService', [
    '$injector', '$timeout', function ($injector, $timeout)
    {
        var searchTimeout;
        return {

            doSearch: function (arg, searchConfig)
            {
                //avoid too many query
                $timeout.cancel(searchTimeout);
                searchTimeout = $timeout(doSearch, 500);

                function doSearch()
                {
                    var requestParams = {};

                    requestParams["order[" + searchConfig.orderBy + "]"] = searchConfig.orderSide || null;
                    requestParams["query"] = searchConfig.query || null;
                    requestParams["offset"] = searchConfig.offset || null;
                    requestParams["limit"] = searchConfig.limit || null;


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
//                        var isFirstQuery = firstQueryNb == queryDone;
//                        queryDone++;
                        arg.callback(data);
                    }
                }
            }
        };
    }
]);

