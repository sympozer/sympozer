/**
 * Delete paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersDeleteCtrl', [ '$scope', 'paperModel', function ($scope, paperModel)
{
    $scope.paper = paperModel;
}]);