/**
 * Show role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesShowCtrl',
    [ '$scope', '$routeParams', 'rolesFact', function ($scope, $routeParams, rolesFact)
    {
        $scope.role = rolesFact.get({id: $routeParams.roleId});

    }]);
