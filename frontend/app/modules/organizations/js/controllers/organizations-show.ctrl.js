/**
 * Show organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsShowCtrl', [ '$scope', '$routeParams', 'organizationsFact', function ($scope, $routeParams, organizationsFact)
{
    //Fetch the organization to display
    $scope.organization = organizationsFact.get({id: $routeParams.organizationId});

}]);