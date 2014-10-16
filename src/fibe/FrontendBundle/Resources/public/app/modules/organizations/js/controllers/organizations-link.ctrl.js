/**
 * Delete organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsLinkCtrl', [ '$scope', 'organizationModel', function ($scope, organizationModel)
{
    $scope.organization = organizationModel;
}]);