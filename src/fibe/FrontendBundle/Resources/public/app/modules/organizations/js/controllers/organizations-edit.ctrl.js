/**
 * Edit organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsEditCtrl', [ '$scope', '$window', '$rootScope', '$routeParams', '$location', 'organizationsFact', function ($scope, $window, $rootScope, $routeParams, $location, organizationsFact)
{
    $scope.organization = organizationsFact.get({id: $routeParams.organizationId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the organization has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'organization saved', type: 'success'});
        $window.history.back();
    }

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.organization.$update({}, success, error);
        }
    }
}]);