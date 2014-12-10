/**
 * Edit role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesEditCtrl',
    [ '$scope', '$window', 'GLOBAL_CONFIG', '$rootScope', '$routeParams', '$location', 'rolesFact', 'personsFact', 'roleLabelsFact', 'eventsFact', '$modal', 'pinesNotifications', 'translateFilter', 'rolesSerializer', function ($scope, $window, GLOBAL_CONFIG, $rootScope, $routeParams, $location, rolesFact, personsFact, roleLabelsFact, eventsFact, $modal, pinesNotifications, translateFilter, rolesSerializer)
    {
        //Fetch the role to edit
        $scope.role = rolesFact.get({id: $routeParams.roleId});

        var error = function (response, args)
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('roles.validations.not_created'),
                type: 'error'
            });
        };

        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('roles.validations.created'),
                type: 'success'
            });
            $window.history.back();
        };

        $scope.update = function (form)
        {
            if (form.$valid)
            {
                rolesSerializer($scope.role).$update(success, error);
            }
        };


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
                    templateUrl: GLOBAL_CONFIG.app.modules.roleLabels.urls.partials + 'modals/roleLabels-modal-form.html',
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