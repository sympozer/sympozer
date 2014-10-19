/**
 * New role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesNewCtrl',
    [ '$scope', '$window', 'GLOBAL_CONFIG', '$routeParams', '$rootScope', '$location', 'rolesFact', 'personsFact', 'roleLabelsFact', 'eventsFact','$modalInstance',
        function ($scope, $window, GLOBAL_CONFIG, $routeParams, $rootScope, $location, rolesFact, personsFact, roleLabelsFact, eventsFact, $modalInstance)
        {
            $scope.role = new rolesFact;

            var error = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the role has not been created', type: 'danger'});
            };

            var success = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'role created', type: 'success'});
                if($modalInstance){
                    $modalInstance.close($scope.role);
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
                $modalInstance.dismiss('cancel');
            };

            //Autocomplete and add person workflow
            $scope.searchPersons = personsFact.all;

            $scope.addPerson = function(personModel){
                function successFn(){
                    personsFact.create(newPerson, function (data) {
                        $scope.role.person = data;
                    });
                }
                if(!personModel.id) {
                    var newPerson = new personsFact();
                    createDialogService(GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-form.html', {
                        title: 'Person creation',
                        controller: 'genericModalCtrl',
                        success: {label: 'Ok', fn: successFn}
                    }, {
                        model: newPerson,
                        modelName : "person"
                    });
                }else{
                    $scope.role.person = personModel;
                }
            };




            //Autocomplete and add rolelabel workflow
            $scope.searchRoleLabels = roleLabelsFact.allByConference;

            $scope.addRoleLabel = function(roleLabelModel){
                function successFn(){
                    newRoleLabel.mainEvent = $routeParams.mainEventId;
                    roleLabelsFact.create(newRoleLabel, function (data) {
                        $scope.role.roleLabelVersion = data;
                    });
                }
                if(!roleLabelModel.id) {
                    var newRoleLabel = new roleLabelsFact();
                    createDialogService(GLOBAL_CONFIG.app.modules.roleLabels.urls.partials + 'roleLabels-form.html', {
                        title: 'Role Label creation',
                        controller: 'genericModalCtrl',
                        success: {label: 'Ok', fn: successFn}
                    }, {
                        model: newRoleLabel,
                        modelName : "roleLabel"
                    });
                }else{
                    $scope.role.roleLabelVersion = roleLabelModel;
                }
            };


            //Autocomplete and add event workflow
            $scope.searchEvents = eventsFact.allByConference;

            $scope.addEvent = function(eventModel){
                function successFn(){
                    newEvent.mainEvent = $routeParams.mainEventId;
                    eventsFact.create(newEvent, function (data) {
                        $scope.role.event= data;
                    });
                }
                if(!eventModel.id) {
                    var newEvent = new eventsFact();
                    createDialogService(GLOBAL_CONFIG.app.modules.events.urls.partials + 'events-form.html', {
                        title: 'Event creation',
                        controller: 'genericModalCtrl',
                        success: {label: 'Ok', fn: successFn}
                    }, {
                        model: newEvent,
                        modelName : "event"
                    });
                }else{
                    $scope.role.event = eventModel;
                }
            };


        }]);