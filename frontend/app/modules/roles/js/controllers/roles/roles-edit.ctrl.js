/**
 * Edit role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesEditCtrl',
    [ '$scope', '$window', 'GLOBAL_CONFIG', '$rootScope', '$routeParams', '$location', 'rolesFact', 'personsFact', 'roleLabelsFact', 'eventsFact', '$modal', 'pinesNotifications', 'translateFilter', function ($scope, $window, GLOBAL_CONFIG, $rootScope, $routeParams, $location, rolesFact, personsFact, roleLabelsFact, eventsFact, $modal, pinesNotifications, translateFilter)
    {
        //Fetch the role to edit
        $scope.role = rolesFact.get({id: $routeParams.roleId});

        var error = function (response, args)
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text : translateFilter('roles.validations.not_created'),
                type : 'error'
            });
        };

        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text : translateFilter('roles.validations.created'),
                type : 'success'
            });
            $window.history.back();
        };

        $scope.update = function (form)
        {
            if (form.$valid)
            {
                rolesFact.update(rolesFact.serialize($scope.role), success, error);
            }
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