/**
 * Edit teammate controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesEditCtrl', [
    '$scope', '$window', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', '$routeParams', '$location', 'teammatesFact', 'personsFact', 'eventsFact', '$modal',
    function ($scope, $window, GLOBAL_CONFIG, createDialogService, $rootScope, $routeParams, $location, teammatesFact, personsFact, eventsFact, $modal)
    {
        $scope.teammate = teammatesFact.get({id: $routeParams.teammateId});

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the teammate has not been saved', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'teammate saved', type: 'success'});
            $window.history.back();
        };

        $scope.update = function (form)
        {
            if (form.$valid)
            {
                $scope.teammate.team = $scope.$root.currentMainEvent.team;
                $scope.teammate.$update({}, success, error);
            }
        };


        //Autocomplete and add person workflow
        $scope.searchPersons = personsFact.all;
        $scope.addPerson = function (personModel)
        {
            if (!personModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-modal-form.html',
                    controller : 'personsNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newPerson)
                {
                    $scope.teammate.person = newPerson;
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.teammate.person = personModel;
            }
        };


        //Autocomplete and add teammatelabel workflow
        $scope.searchTeammates = teammatesFact.allByConference;
        $scope.addTeammateLabel = function (teammateLabelModel)
        {
            if (!teammateLabelModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.teammateLabelVersions.urls.partials + 'teammateLabelVersions-modal-form.html',
                    controller : 'teammatesNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newTeammateLabel)
                {
                    $scope.teammate.teammateLabelVersion = newTeammateLabel;
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.teammate.teammateLabelVersion = teammateLabelModel;
            }
        };

        //Autocomplete and add event workflow
        $scope.searchEvents = eventsFact.allByConference;
        $scope.addEvent = function (eventModel)
        {
            if (!eventModel.id)
            {
                var modalInstance = $modal.open({
                    templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'events-modal-form.html',
                    controller : 'eventsNewCtrl',
                    size       : "large",
                    resolve    : {
                    }
                });
                modalInstance.result.then(function (newPerson)
                {
                    $scope.teammate.event = newPerson;
                }, function ()
                {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            else
            {
                $scope.teammate.event = eventModel;
            }
        };
    }]);