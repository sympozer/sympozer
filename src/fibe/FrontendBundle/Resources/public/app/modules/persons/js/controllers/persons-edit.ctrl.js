/**
 * Edit person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsEditCtrl', [ '$scope', '$filter', '$rootScope', '$modal', 'GLOBAL_CONFIG', '$routeParams', '$location', 'createDialog', 'personsFact', 'organizationsFact', 'papersFact',
    function ($scope, $filter, $rootScope, $modal, GLOBAL_CONFIG, $routeParams, $location, createDialogService, personsFact, organizationsFact, papersFact)
{
    $scope.person = personsFact.get({id: $routeParams.personId});
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    //Error on patch request
    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the field has not been saved', type: 'danger'});
    }

    //Success on patch request
    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'field saved', type: 'success'});
    }

    //Send patch request on the field to be persisted
    $scope.updatePerson = function(field, data){
        var updatePersonParam = {id: $scope.person.id};
        updatePersonParam[field] = data;
        return personsFact.patch(updatePersonParam, success, error);
    }

    //Populate array of a specific linked entity
    $scope.addRelationship = function(key, model){
        //Check if array available for the linked entity
        if(!$scope.person[key]){
            $scope.person[key] = [];
        }

        //Stop if the object selected is already in array (avoid duplicates)
        if(! $filter('inArray')('id', model.id, $scope.person[key])){
            //If no duplicate add the selected object to the specified array
            $scope.person[key].push(model);
            $scope.updatePerson(key, $scope.person[key]);
        };
    }

    $scope.removeRelationship = function(key, index){
        $scope.person[key].splice(index, 1);
//        personsFact.update($scope.person);
        $scope.updatePerson(key, $scope.person[key]);
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
                $scope.addRelationship("organizations", newOrganization);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }else{
            $scope.addRelationship("organizations", organizationModel);
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
                $scope.addRelationship("papers", newPaper);
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }else{
            $scope.addRelationship("papers", paperModel);
        }
    }
}]);