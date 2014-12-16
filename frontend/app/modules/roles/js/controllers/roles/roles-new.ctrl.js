/**
 * New role controller
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesNewCtrl',
    [ '$scope', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'rolesFact', 'personsFact', 'roleLabelsFact', 'eventsFact', '$modal', 'formValidation', 'pinesNotifications', 'translateFilter',
        function ($scope, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, rolesFact, personsFact, roleLabelsFact, eventsFact, $modal, formValidation, pinesNotifications, translateFilter)
        {
            $scope.role = new rolesFact;

            //On post new role error
            var error = function (response, args)
            {
                //Display error from server
                if ("Validation Failed" == response.data.message)
                {
                    formValidation.transformFromServer(response);
                }
                else
                {
                    //Notify of the creation action error
                    pinesNotifications.notify({
                        title: translateFilter('global.validations.error'),
                        text : translateFilter('roles.validations.not_created'),
                        type : 'error'
                    });
                }
            };

            //On post new role success
            var success = function (response, args)
            {
                //Notify of the creation action success
                pinesNotifications.notify({
                    title: translateFilter('global.validations.success'),
                    text : translateFilter('roles.validations.created'),
                    type : 'success'
                });

                //If view is a modal instance then close (resolve promise with new role)
                if ($scope.$close)
                {
                    $scope.$close($scope.role);
                }
                else
                {
                    //If view is a page, go back to previous page
                    $window.history.back();
                }
            };

            //Send role POST request to server
            $scope.create = function (form)
            {
                //Check form validity
                if (form.$valid)
                {
                    //Set main event of the new role
                    $scope.role.mainEvent = {id: $routeParams.mainEventId};
                    rolesFact.create(rolesFact.serialize($scope.role), success, error);
                }
            }

            //close modal function (useless if view is not a modal instance
            $scope.cancel = function ()
            {
                $scope.$dismiss('cancel');
            };


            //Autocomplete and add person workflow
            $scope.searchPersons = personsFact.all;
            $scope.addPerson = function (personModel)
            {
                if (!personModel.id)
                {
                    var modalInstance = $modal.open({
                        templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'modals/persons-modal-form.html',
                        controller : 'personsNewCtrl',
                        size       : "large",
                        resolve    : {
                        }
                    });
                    modalInstance.result.then(function (newPerson)
                    {
                        $scope.role.person = newPerson;
                    }, function ()
                    {
                        //$log.info('Modal dismissed at: ' + new Date());
                    });
                }
                else
                {
                    $scope.role.person = personModel;
                }
            }


            //Autocomplete and add rolelabel workflow
            $scope.searchRoleLabels = roleLabelsFact.allByConference;
            $scope.addRoleLabel = function (roleLabelModel)
            {
                if (!roleLabelModel.id)
                {
                    //If topic doesn't exist, create it
                    roleLabelsFact.create(roleLabelsFact.serialize({ label : roleLabelModel}), function(roleLabel){
                        $scope.role.roleLabel = roleLabel;
                    },function(error){
                        //Notify of the creation action error
                        pinesNotifications.notify({
                            title: translateFilter('global.validations.error'),
                            text : translateFilter('roleLabels.validations.not_created'),
                            type : 'error'
                        });
                    });
                }
                else
                {
                    $scope.role.roleLabel = roleLabelModel;
                }
            }

            //Autocomplete and add event workflow
            $scope.searchEvents = eventsFact.allByConference;
            $scope.addEvent = function (eventModel)
            {
                if (!eventModel.id)
                {
                    var modalInstance = $modal.open({
                        templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'modals/events-modal-form.html',
                        controller : 'eventsNewCtrl',
                        size       : "large",
                        resolve    : {
                        }
                    });
                    modalInstance.result.then(function (newPerson)
                    {
                        $scope.role.event = newPerson;
                    }, function ()
                    {
                        //$log.info('Modal dismissed at: ' + new Date());
                    });
                }
                else
                {
                    $scope.role.event = eventModel;
                }
            }
        }]);