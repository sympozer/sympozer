/**
 * Edit paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersEditCtrl', [
    '$scope', '$rootScope', '$routeParams', '$location', 'papersFact', 'personsFact', 'createDialog', function ($scope, $rootScope, $routeParams, $location, papersFact, personsFact, createDialogService)
    {
        $scope.paper = papersFact.get({id: $routeParams.paperId});

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the paper has not been saved', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper saved', type: 'success'});
            $location.path('/conference/' + $rootScope.currentMainEvent.id + '/papers/list');
        };

        $scope.update = function (form)
        {
            if (form.$valid)
            {
                $scope.paper.$update({}, success, error);
            }
        }

        $scope.updatePaper = function (field, data)
        {
            var updatePaperParam = {id: $scope.paper.id};
            updatePaperParam[field] = data;
            return papersFact.patch(updatePaperParam, success, error);
        }

        //Autocomplete and add organization workflow
        $scope.searchPersons = personsFact.all;
        $scope.addPerson = function (personModel)
        {
            function successFn()
            {
                personsFact.create(newPerson, function (data)
                {
                    $scope.paper.authors.push(data);
                    $scope.updatePaper("persons", $scope.person.persons);
                });
            }

            if (!personModel.id)
            {
                var newPerson = new personsFact();
                createDialogService(GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-form.html', {
                    title     : 'Person creation',
                    controller: 'genericModalCtrl',
                    success   : {label: 'Ok', fn: successFn}
                }, {
                    model    : newPerson,
                    modelName: "person"
                });
            }
            else
            {
                $scope.paper.authors.push(personModel);
                $scope.updatePaper("authors", $scope.paper.authors);
            }
        }
    }]);