
/**
 * reset password request controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('resetPwdRequestCtrl',
    [ '$scope', '$window', '$routeParams', 'usersFact', '$location', function ($scope, $window, $routeParams, usersFact, $location)
    {
        var error = function (response, args)
        {
            $scope.busy = false;
            $scope.$root.$broadcast('AlertCtrl:addAlert', {code: response.data.error, type: 'danger'});
        }

        var success = function (response, args)
        {
            $scope.busy = false;
            $scope.$root.$broadcast('AlertCtrl:addAlert', {code: 'ResetPwdRequest_success', type: 'success'});
            $location.path('/');
        }

        $scope.resetPwdRequestAction = function (resetPwdRequestForm)
        {
            if (resetPwdRequestForm.$valid)
            {
                $scope.busy = true;
                usersFact.resetpwdrequest({"username": $scope.user.username}, success, error);
            }
        }
    }]);