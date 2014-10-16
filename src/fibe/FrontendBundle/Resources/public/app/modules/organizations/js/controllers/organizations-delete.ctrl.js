/**
 * Delete organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsDeleteCtrl', [ '$scope', 'organizationModel', function ($scope, organizationModel)
{
    $scope.organization = organizationModel;
}]);