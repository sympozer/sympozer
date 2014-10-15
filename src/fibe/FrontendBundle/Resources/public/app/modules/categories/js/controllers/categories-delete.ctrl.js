
/**
 * Delete category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesDeleteCtrl', [ '$scope', 'categoryModel', function ($scope, categoryModel)
{
    $scope.category = categoryModel;
}]);
