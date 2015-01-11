/**
 * @type {factory}
 */
angular.module('eventsApp').factory('importService', [
    'importFact',
    function (importFact)
    {
        var entityLbl,
            header;

        return {
            init         : function (entity)
            {
                entityLbl = entity;
                console.log("Importing " + entityLbl + "...");
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
            send         : function (data, mainEventId, commit, success, error)
            {
                console.log("Sending " + data.length + " entity(ies) : ", data);
                new importFact(data).$import({entityLabel: entityLbl, mainEventId: mainEventId, commit: commit}, success, error);
            }
        };
    }
]);
