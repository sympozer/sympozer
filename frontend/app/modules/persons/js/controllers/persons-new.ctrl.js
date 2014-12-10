/**
 * New person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsNewCtrl', [ '$scope', 'GLOBAL_CONFIG', '$filter', '$window', '$rootScope', '$location', 'personsFact', 'papersFact', 'organizationsFact',  'pinesNotifications', 'translateFilter', '$modal',
    function ($scope, GLOBAL_CONFIG, $filter, $window, $rootScope, $location, personsFact, papersFact, organizationsFact, pinesNotifications, translateFilter, $modal)
    {
        $scope.person = new personsFact();

        var error = function (response, args)
        {
            //Notify of the new role label post action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('persons.validations.not_created'),
                type: 'error'
            });
        }

        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('persons.validations.created'),
                type: 'success'
            });

            //close modal if view is a modal instance (resolve promise with the new person)
            if($scope.$close){
                $scope.$close($scope.person);
            }else{
                //Go back to previous page otherwise
                $window.history.back();
            }
        }

        //Fct to close the modal if the view is a modal instance
        $scope.cancel = function () {
            $scope.$dismiss('cancel');
        };

        //Send post request with new person info
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