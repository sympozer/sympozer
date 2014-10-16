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