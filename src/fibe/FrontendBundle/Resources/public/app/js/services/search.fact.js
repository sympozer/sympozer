


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
                    var entityFact = $injector.get(arg.entitiesLbl + 'Fact'),
                        queryDone = queryNb,
                        firstQueryNb = queryNb;
//                    arg.busy = true;

                    if (searchConfig.orderBy)
                    {
                        searchConfig["order[" + searchConfig.orderBy + "]"] = searchConfig.orderSide;
                    }
                    for (var i in searchConfig.filters)
                    {
                        var currentFilter = searchConfig.filters[i];
                        if(currentFilter instanceof Array){
                            searchConfig["filters[" + i + "]"] = [];
                            for (var value in currentFilter) {
                                searchConfig["filters[" + i + "]"].push(currentFilter[value]);
                            }
                        }else{
                            searchConfig["filters[" + i + "]"] = searchConfig.filters[i];
                        }
                    }

                    queryNb++;
                    entityFact.all(searchConfig, success);

//                    if (entityFact.allByConference)
//                    {
//                        queryNb++;
////                        console.log("get by conference");
//                        entityFact.allByConference({limit: arg.limit, query: arg.query}, success);
//                    }

                    function success(data)
                    {
                        var isFirstQuery = firstQueryNb == queryDone;
                        queryDone++;
//                        console.log("isFirstQuery ", isFirstQuery, "requete nb ", queryNb, "first query ", firstQueryNb, "queryDone ", queryDone);
//                        arg.busy = false;
                        arg.callback(data, isFirstQuery, queryNb == queryDone);
                    }
                }
            }
        };
    }
]);

