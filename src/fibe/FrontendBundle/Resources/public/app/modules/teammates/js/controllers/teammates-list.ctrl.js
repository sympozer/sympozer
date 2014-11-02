/**
 * List (all) teammates controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'teammatesFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, teammatesFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    $scope.request = teammatesFact.allByConference;


    $scope.reload = function ()
    {
        $scope.entities.$promise.then(function ()
        {
            console.log('From cache:', $scope.persons);
        });
    };

    $scope.clone = function (person)
    {
        var clonePerson = angular.copy(person);
        clonePerson.id = null;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Person saved', type: 'success'});
            $scope.entities.push(response);
        };

        clonePerson.$create({}, success, error);
    };


    $scope.deleteModal = function (index, person)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-delete.html', {
            id: 'complexDialog',
            title: 'Person deletion',
            backdrop: true,
            controller: 'personsDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                teammatesFact.delete({id: person.id},function(data){
                    $scope.entities.splice(index, 1);
                });
            }}
        }, {
            personModel: person
        });
    }
}]);