/**
 *
 */
angular.module('importApp').controller('importCtrl', [
    '$scope',
    'GLOBAL_CONFIG',
    '$modal',
    'importService',
    function ($scope, GLOBAL_CONFIG, $modal, importService)
    {
        var csvsAsArrays,
            fileIsParsed = false,

            csvRowSeparator = '\n',
            csvFieldSeparator = ';',
            csvTextDelimiter = '"',
            csvCollectionSeparator = '|',
            csvHasHeader = true,

            validationStep = 2,
            importStep = 3,
            validated = 3
            ;

        $scope.busy = false;
        $scope.error = false;
        $scope.validationError = true;
        $scope.importResults = {};

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
                case validationStep:
                    parseFile();

                    validateFile();

                    break;
                case importStep:
                    parseFile();

                    validateFile();

                    //import
                    if (!$scope.validationError)
                    {
                        importFile();
                    }
                    else
                    {
                        return false;
                    }
                    break;
            }

            function parseFile()
            {
                if (!fileIsParsed)
                {
                    $scope.results = importService.processImport(csvsAsArrays);
                    fileIsParsed = true;
                    validated = false;
                    $scope.validationError = true;
                }
            }

            function validateFile()
            {
                //validate
                if (!validated)
                {
                    $scope.busy = true;
                    validated = true;
                    importService.send($scope.results, $scope.$root.currentMainEvent ? $scope.$root.currentMainEvent.id : undefined, "false", function (importResults)
                    {
                        $scope.importResults = importResults;
                        $scope.error = false;
                        $scope.busy = false;
                        if (_.size($scope.importResults.errors) == 0)
                        {
                            $scope.validationError = false;
                        }

                    }, function ()
                    {
                        $scope.error = true;
                        $scope.busy = false;
                    });
                }
            }

            function importFile()
            {
                $scope.busy = true;
                importService.send($scope.results, $scope.$root.currentMainEvent ? $scope.$root.currentMainEvent.id : undefined, "true", function (importResults)
                {
                    $scope.importResults = importResults;
                    $scope.error = false;
                    $scope.busy = false;

                }, function ()
                {
                    $scope.error = true;
                    $scope.busy = false;
                });
            }
        };

        //parses csvs into arrays and put in csvsAsArrays
        // called when files were drop or selected
        $scope.fileChanged = function (isRemoved)
        {
            csvsAsArrays = [];
            fileIsParsed = $scope.busy = false;
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
                    $scope.wizard.step(validationStep);
                }

            }
        };

        $scope.retrySend = function (step)
        {
            $scope.busy = true;
            $scope.changeStep(step || importStep);
        };

    }])
;