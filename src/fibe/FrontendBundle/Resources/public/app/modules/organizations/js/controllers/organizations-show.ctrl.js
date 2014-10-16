/**
 * Show organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsShowCtrl', [ '$scope', '$routeParams', 'organizationsFact', function ($scope, $routeParams, organizationsFact)
{
    $scope.organization = organizationsFact.get({id: $routeParams.organizationId});

    console.log($scope.organization);
}]);