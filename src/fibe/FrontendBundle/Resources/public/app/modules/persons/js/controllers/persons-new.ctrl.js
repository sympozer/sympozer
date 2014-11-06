/**
 * New person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsNewCtrl', [ '$scope', '$filter', '$window', '$rootScope', '$location', 'personsFact', 'papersFact', 'organizationsFact',
    function ($scope, $filter, $window, $rootScope, $location, personsFact, papersFact, organizationsFact)
    {
        $scope.person = new personsFact();

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'persons.validations.not_created', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'persons.validations.created', type: 'success'});
            if($scope.$close){
                $scope.$close($scope.person);
            }else{
                $window.history.back();
            }
        }

        $scope.cancel = function () {
            $scope.$dismiss('cancel');
        };

        $scope.create = function (form)
        {
            if (form.$valid)
            {
                $scope.person.$create({}, success, error);
            }
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