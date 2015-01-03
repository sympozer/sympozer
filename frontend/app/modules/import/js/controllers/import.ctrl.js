/**
 *
 */
angular.module('importApp').controller('importCtrl', ['$scope', 'GLOBAL_CONFIG', '$modal', 'importService', function ($scope, GLOBAL_CONFIG, $modal, importService)
{
    var csvsAsArrays,
        processed = false,
        sent = false,

        csvRowSeparator = '\n',
        csvFieldSeparator = ';',
        csvTextDelimiter = '"',
        csvCollectionSeparator = '|',
        csvHasHeader = true,

        resultStep = 2,
        importStep = 3
        ;

    //opens modal
    $scope.startImport = function (entityLbl)
    {
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
                    sent = false;
                }
                break;
            case importStep:
                if (!sent)
                {
                    importService.send($scope.results, $scope.$root.currentMainEvent ? $scope.$root.currentMainEvent.id : undefined);
                    sent = true;
                }
                break;
        }
    };

    //parses csvs into arrays and put in csvsAsArrays
    // called when files were drop or selected
    $scope.fileChanged = function ()
    {
        csvsAsArrays = [];
        processed = sent = false;
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
        }
    };

}])
;