/**
 * Persons controllers
 */

/**
 * Main persons controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsMainCtrl', [function ($scope)
{

}]);

/**
 * List persons by event controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsListByEventCtrl', ['$scope', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'personsFact', '$cachedResource', function ($scope, GLOBAL_CONFIG, createDialogService, $rootScope, personsFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $scope.person = personsFact.get({idEvent: $routeParams.eventId});
}]);

/**
 * List (all) persons controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'personsFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, personsFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    var baseFilters;
    if ($routeParams.confId)
    {
        $scope.filters = baseFilters = {
            mainEventId: $routeParams.confId
        };
    }

    $scope.reload = function ()
    {
        $scope.entities.$promise.then(function ()
        {
            console.log('From cache:', $scope.persons);
        });
    }

    $scope.clone = function (person)
    {
        clonePerson = angular.copy(person);
        clonePerson.id = null;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Person saved', type: 'success'});
            $scope.entities.push(response);
        }

        clonePerson.$create({}, success, error);
    }


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
                personsFact.delete({id: person.id},function(data){
                    $scope.entities.splice(index, 1);
                });
            }}
        }, {
            personModel: person
        });
    }
}]);

/**
 * New person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsNewCtrl', [ '$scope', '$rootScope', '$location', 'personsFact', function ($scope, $rootScope, $location, personsFact)
{
    $scope.person = $scope.person || new personsFact();

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the person has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'person created', type: 'success'});
        $location.path('/persons/list');
    }

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.person.$create({}, success, error);
        }
    }
}]);

/**
 * Edit person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'personsFact', function ($scope, $rootScope, $routeParams, $location, personsFact)
{
    $scope.person = personsFact.get({id: $routeParams.personId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the person has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'person saved', type: 'success'});
        $location.path('/persons/list');
    }

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.person.$update({}, success, error);
        }
    }
}]);

/**
 * Show person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsShowCtrl', [ '$scope', '$routeParams', 'personsFact', function ($scope, $routeParams, personsFact)
{
    $scope.person = personsFact.get({id: $routeParams.personId});

}]);

/**
 * Delete person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsDeleteCtrl', [ '$scope', 'personModel', function ($scope, personModel)
{
    $scope.person = personModel;
}]);

