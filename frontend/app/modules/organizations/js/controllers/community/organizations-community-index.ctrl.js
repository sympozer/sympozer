/**
 * List organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsCommunityIndexCtrl', ['$scope', 'organizationsFact', function ($scope, organizationsFact )
{

    //Preparing entities object for entity list handler directive
    $scope.entities = [];

    //Fetching all organization entities
    $scope.request = organizationsFact.all;


}]);