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