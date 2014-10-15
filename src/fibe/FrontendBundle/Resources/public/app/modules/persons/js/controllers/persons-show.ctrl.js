/**
 * Show person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'personsFact', function ($scope, $rootScope, $routeParams, personsFact)
{
    $scope.person = personsFact.get({id: $routeParams.personId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the field has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'field saved', type: 'success'});
    }

    $scope.updatePerson = function(field, data){
        var updatePersonParam = {id: $scope.person.id};
        updatePersonParam[field] = data;
        return personsFact.patch(updatePersonParam, success, error);
    }

    $scope.c = function(organization){
        var updatePersonParam = {id: $scope.person.id};
        updatePersonParam[field] = data;
        return personsFact.patch(updatePersonParam, success, error);
    }

}]);