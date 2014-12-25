/**
 * List papers controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersCommunityListCtrl', ['$scope', 'papersFact', function ($scope, papersFact)
{
    //Preparing entities object for entity list handler directive
    $scope.entities = [];

    //Fetching papers entities when scroll detected
    $scope.request = papersFact.all;

}]);