/**
 * Edit person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsEditCtrl', [ '$scope', '$rootScope', 'GLOBAL_CONFIG', '$routeParams', '$location', 'createDialog', 'personsFact', 'organizationsFact', 'papersFact', function ($scope, $rootScope, GLOBAL_CONFIG, $routeParams, $location, createDialogService, personsFact, organizationsFact, papersFact)
{
    $scope.person = personsFact.get({id: $routeParams.personId});
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the field has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'field saved', type: 'success'});
    }

    $scope.updatePerson = function(field, data){
        var updatePersonParam = {id: $scope.person.id};
        updatePersonParam[field] = data;
        return personsFact.patch(updatePersonParam, success, error);
    }

    //Autocomplete and add organization workflow
    $scope.searchOrganizations = organizationsFact.all;

    $scope.addOrganization = function(organizationModel){
        function successFn(){
            organizationsFact.create(newOrganization, function (data) {
                $scope.person.organizations.push(data);
                $scope.updatePerson("organizations", $scope.person.organizations);
            });
        }

        if(!organizationModel.id) {
            var newOrganization = new organizationsFact();
            createDialogService(GLOBAL_CONFIG.app.modules.organizations.urls.partials + 'organizations-form.html', {
                title: 'Organization creation',
                controller: 'genericModalCtrl',
                success: {label: 'Ok', fn: successFn}
            }, {
                model: newOrganization,
                modelName : "organization"
            });
        }else{
            $scope.person.organizations.push(organizationModel);
            $scope.updatePerson("organizations", $scope.person.organizations);
        }
    };


    //Autocomplete and add organization workflow
    $scope.searchPapers = papersFact.all;
    $scope.addPaper = function(paperModel){
        function successFn(){
            papersFact.create(newPaper, function (data) {
                $scope.person.papers.push(data);
                $scope.updatePerson("papers", $scope.person.papers);
            });
        }

        if(!paperModel.id) {
            var newPaper = new papersFact();
            createDialogService(GLOBAL_CONFIG.app.modules.papers.urls.partials + 'papers-form.html', {
                title: 'Paper creation',
                controller: 'genericModalCtrl',
                success: {label: 'Ok', fn: successFn}
            }, {
                model: newPaper,
                modelName : "paper"
            });
        }else{
            $scope.person.papers.push(paperModel);
            $scope.updatePerson("papers", $scope.person.papers);
        }
    }
}]);