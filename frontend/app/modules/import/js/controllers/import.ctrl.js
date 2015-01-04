/**
 *
 */
angular.module('importApp').controller('importCtrl', ['$scope', 'GLOBAL_CONFIG', '$modal', 'importService', function ($scope, GLOBAL_CONFIG, $modal, importService)
{
    var csvsAsArrays,
        processed = false,

        csvRowSeparator = '\n',
        csvFieldSeparator = ';',
        csvTextDelimiter = '"',
        csvCollectionSeparator = '|',
        csvHasHeader = true,

        resultStep = 2,
        importStep = 3
        ;

    $scope.sent = false;

    //opens modal
    $scope.startImport = function (entityLbl)
    {
        $scope.entityLbl = entityLbl;
        $scope.header = importService.init(entityLbl);
        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.import.urls.partials + 'modals/import.html',
            controller : 'importCtrl',
            size       : "large",
            scope      : $scope
        });
    };

    //on wizard step change
    $scope.changeStep = function (stepNb)
    {
        switch (stepNb)
        {
            case resultStep:
                if (!processed)
                {
                    $scope.results = importService.processImport(csvsAsArrays);
                    processed = true;
                    $scope.sent = false;
                }
                break;
            case importStep:
                if (!$scope.sent)
                {
                    if (!processed)
                    {
                        $scope.results = importService.processImport(csvsAsArrays);
                        processed = true;
                    }

                    importService.send($scope.results, $scope.$root.currentMainEvent ? $scope.$root.currentMainEvent.id : undefined, function (importResults)
                    {
                        $scope.importResults = importResults;
                        $scope.error = false;
                        $scope.sent = true;

                    }, function ()
                    {
                        $scope.error = true;
                        $scope.sent = true;
                    });
                }
                break;
        }
    };

    //parses csvs into arrays and put in csvsAsArrays
    // called when files were drop or selected
    $scope.fileChanged = function (isRemoved)
    {
        csvsAsArrays = [];
        processed = $scope.sent = false;
        this.$flow.upload();//just update ui
        var i = 0,
            reader = new FileReader(),
            files = this.$flow.files;

        reader.onload = function (onLoadEvent)
        {
            var csvArray = onLoadEvent.target.result.csvToArray({rSep: csvRowSeparator, fSep: csvFieldSeparator, quot: csvTextDelimiter, trim: true });
            if (csvHasHeader)
            {
                //remove the first row
                var header = csvArray.splice(0, 1);
            }
            csvsAsArrays.push(csvArray);
            readNextFile(++i);
        };

        readNextFile(i);

        function readNextFile(index)
        {
            if (files[index])
            {
                reader.readAsText(files[index].file);
            }
            else if (!isRemoved)
            { //nothing else to read
                $scope.wizard.step(resultStep);
            }

        }
    };

    $scope.retrySend = function ()
    {
        $scope.sent = false;
        $scope.changeStep(importStep);
    };

}])
;