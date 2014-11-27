/**
 * Edit role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesEditCtrl',
    [ '$scope', '$window', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', '$routeParams', '$location', 'rolesFact',  'personsFact', 'roleLabelsFact', 'eventsFact', '$modal', function ($scope, $window,  GLOBAL_CONFIG, createDialogService, $rootScope, $routeParams, $location, rolesFact,  personsFact, roleLabelsFact, eventsFact, $modal)
    {
        $scope.role = rolesFact.get({id: $routeParams.roleId});

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'roles.validations.not_created', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'roles.validations.created', type: 'success'});
            $window.history.back();
        };

        $scope.update = function (form)
        {
            if (form.$valid)
            {
                $scope.role.$update({}, success, error);
            }
        }


        //Autocomplete and add person workflow
        $scope.searchPersons = personsFact.all;
        $scope.addPerson = function(personModel){
            if(!personModel.id) {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'modals/persons-modal-form.html',
                    controller: 'personsNewCtrl',
                    size: "large",
                    resolve: {
                    }
                });
                modalInstance.result.then(function (newPerson) {
                    $scope.role.person = newPerson;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                $scope.role.person = personModel;
            }
        }


        //Autocomplete and add rolelabel workflow
        $scope.searchRoleLabels = roleLabelsFact.allByConference;
        $scope.addRoleLabel = function(roleLabelModel){
            if(!roleLabelModel.id) {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.roleLabelVersions.urls.partials + 'modals/roleLabelVersions-modal-form.html',
                    controller: 'roleLabelsNewCtrl',
                    size: "large",
                    resolve: {
                    }
                });
                modalInstance.result.then(function (newRoleLabel) {
                    $scope.role.roleLabelVersion = newRoleLabel;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                $scope.role.roleLabelVersion = roleLabelModel;
            }
        }

        //Autocomplete and add event workflow
        $scope.searchEvents = eventsFact.allByConference;
        $scope.addEvent = function(eventModel){
            if(!eventModel.id) {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'modals/events-modal-form.html',
                    controller: 'eventsNewCtrl',
                    size: "large",
                    resolve: {
                    }
                });
                modalInstance.result.then(function (newPerson) {
                    $scope.role.event = newPerson;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }else{
                $scope.role.event = eventModel;
            }
        }
    }]);