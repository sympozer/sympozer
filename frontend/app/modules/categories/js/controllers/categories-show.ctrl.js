/**
 * Show category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesShowCtrl', [ '$scope', '$routeParams', 'categoriesFact', function ($scope, $routeParams, categoriesFact)
{
    $scope.category = categoriesFact.get({id: $routeParams.categoryId});

}]);