/**
 * Delete role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesDeleteCtrl',
    [ '$scope', 'roleModel', function ($scope, roleModel)
    {
        $scope.role = roleModel;
    }]);