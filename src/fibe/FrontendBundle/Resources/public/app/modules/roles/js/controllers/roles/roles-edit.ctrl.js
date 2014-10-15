/**
 * Edit role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesEditCtrl',
    [ '$scope', '$window', '$rootScope', '$routeParams', '$location', 'rolesFact', function ($scope, $window, $rootScope, $routeParams, $location, rolesFact)
    {
        $scope.role = rolesFact.get({id: $routeParams.roleId});

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the role has not been saved', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'role saved', type: 'success'});
            $window.history.back();
        };

        $scope.update = function (form)
        {
            if (form.$valid)
            {
                $scope.role.$update({}, success, error);
            }
        }
    }]);