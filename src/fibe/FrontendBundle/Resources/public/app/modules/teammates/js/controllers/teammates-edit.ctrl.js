/**
 * Edit person controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesEditCtrl', [ '$scope', '$rootScope', '$modal', 'GLOBAL_CONFIG', '$routeParams', '$location', 'createDialog', 'teammatesFact', 'organizationsFact', 'papersFact', function ($scope, $rootScope, $modal, GLOBAL_CONFIG, $routeParams, $location, createDialogService, teammatesFact, organizationsFact, papersFact)
{
    $scope.person = teammatesFact.get({id: $routeParams.personId});
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
        return teammatesFact.patch(updatePersonParam, success, error);
    }

    //Autocomplete and add organization workflow
    $scope.searchOrganizations = organizationsFact.all;
    $scope.addOrganization = function(organizationModel){
        if(!organizationModel.id) {
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.organizations.urls.partials + 'organizations-modal-form.html',
                controller: 'organizationsNewCtrl',
                size: "large",
                resolve: {
                    personModel : function(){
                        return $scope.person;
                    }
                }
            });
            modalInstance.result.then(function (newOrganization) {
                if(!$scope.person.organizations){
                    $scope.person.organizations = [];
                }
                $scope.person.organizations.push(newOrganization);
                $scope.updatePerson("organizations", $scope.person.organizations);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }else{
            if(!$scope.person.organizations){
                $scope.person.organizations = [];
            }
            $scope.person.organizations.push(organizationModel);
            $scope.updatePerson("organizations", $scope.person.organizations);

        }
    }



    //Autocomplete and add paper workflow
    $scope.searchPapers = papersFact.all;
    $scope.addPaper = function(paperModel){
        if(!paperModel.id) {
            var modalInstance = $modal.open({
                templateUrl: GLOBAL_CONFIG.app.modules.papers.urls.partials + 'papers-modal-form.html',
                controller: 'papersNewCtrl',
                size: "large",
                resolve: {
                }
            });
            modalInstance.result.then(function (newPaper) {
                if(!$scope.person.papers){
                    $scope.person.papers = [];
                }
                $scope.person.papers.push(newPaper);
                $scope.updatePerson("papers", $scope.person.papers);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }else{
            if(!$scope.person.papers){
                $scope.person.papers = [];
            }
            $scope.person.papers.push(paperModel);
            $scope.updatePerson("papers", $scope.person.papers);

        }
    }
}]);