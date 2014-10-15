/**
 * Show paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersShowCtrl', [ '$scope', '$routeParams', 'papersFact', function ($scope, $routeParams, papersFact)
{
    $scope.paper = papersFact.get({id: $routeParams.paperId});

}]);