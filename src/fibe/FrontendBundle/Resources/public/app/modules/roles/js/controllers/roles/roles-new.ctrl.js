/**
 * New role controller
 *
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesNewCtrl',
    [ '$scope', '$window', '$routeParams', '$rootScope', '$location', 'rolesFact', function ($scope, $window, $routeParams, $rootScope, $location, rolesFact)
    {
        $scope.role = new rolesFact;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the role has not been created', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'role created', type: 'success'});
            $window.history.back();
        };

        $scope.create = function (form)
        {
            if (form.$valid)
            {
                $scope.role.mainEvent = $routeParams.mainEventId;
                $scope.role.$create({}, success, error);
            }
        }
    }]);