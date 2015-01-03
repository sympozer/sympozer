/**
 * @type {factory}
 */
angular.module('eventsApp').factory('importService', [
    '$injector',
    'importFact',
    function ($injector, importFact)
    {
        var entityLbl,
            entityFact,
            header;

        return {
            init         : function (entity)
            {
                entityLbl = entity;
                console.log("Importing " + entityLbl + "...");
                entityFact = $injector.get(entityLbl.toLocaleLowerCase() + "sFact");
                return header = importFact.get_header({entityLabel: entityLbl});
            },
            processImport: function (csvs)
            {
                console.log("Processing " + csvs.length + " file(s) with header : ", header);

                var results = [];
                //for each csv
                for (var i in csvs)
                {
                    var csv = csvs[i];
                    //for each row
                    for (var j in csv)
                    {
                        var row = csv[j],
                            entity = [];
                        //for each field
                        for (var k in header.header)
                        {
                            entity.push(row[k]);
                        }
                        results.push(entity);
                    }
                }
                console.log("Found " + results.length + " entity(ies) : ", results);
                return results;
            },
            send         : function (data, mainEventId)
            {
                console.log("Sending " + data.length + " entity(ies) : ", data);
                return new importFact(data).$import({entityLabel: entityLbl, mainEventId: mainEventId});
            }
        };
    }
]);
