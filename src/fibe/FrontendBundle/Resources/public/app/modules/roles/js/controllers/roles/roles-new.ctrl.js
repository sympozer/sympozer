/**
 * New role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesNewCtrl',
    [ '$scope', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'rolesFact', 'personsFact', 'roleLabelsFact', 'eventsFact','$modal',
        function ($scope, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, rolesFact, personsFact, roleLabelsFact, eventsFact, $modal)
        {
            $scope.role = new rolesFact;

            debugger;
            var error = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the role has not been created', type: 'danger'});
            };

            var success = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'role created', type: 'success'});
                if($scope.$close){
                    $scope.$close($scope.role);
                }else{
                    $window.history.back();
                }
            };

            $scope.create = function (form)
            {
                if (form.$valid)
                {
                    $scope.role.mainEvent = $routeParams.mainEventId;
                    $scope.role.$create({}, success, error);
                }
            }

            $scope.cancel = function () {
                $scope.$dismiss('cancel');
            };



            //Autocomplete and add person workflow
            $scope.searchPersons = personsFact.all;
            $scope.addPerson = function(personModel){
                if(!personModel.id) {
                    var modalInstance = $modal.open({
                        templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-modal-form.html',
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
                        templateUrl: GLOBAL_CONFIG.app.modules.roleLabels.urls.partials + 'roleLabels-modal-form.html',
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
                        templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'events-modal-form.html',
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