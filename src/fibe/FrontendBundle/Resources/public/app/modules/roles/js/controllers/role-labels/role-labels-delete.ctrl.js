
/**
 * Delete label role controller
 *
 * @type {controller}
 */
angular.module('roleLabelsApp').controller('roleLabelsDeleteCtrl',
    [ '$scope', 'roleLabelModel', function ($scope, roleLabelModel)
    {
        $scope.roleLabel = roleLabelModel;
    }]);