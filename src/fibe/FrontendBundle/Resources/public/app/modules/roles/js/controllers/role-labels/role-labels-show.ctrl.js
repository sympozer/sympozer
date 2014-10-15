/**
 * Show label role controller
 *
 * @type {controller}
 */
angular.module('roleLabelsApp').controller('roleLabelsShowCtrl',
    [ '$scope', '$routeParams', 'roleLabelsFact', function ($scope, $routeParams, roleLabelsFact)
    {
        $scope.roleLabel = roleLabelsFact.get({id: $routeParams.roleLabelId});

    }]);