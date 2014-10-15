
/**
 * confirm email controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('confirmCtrl',
    [ '$scope', '$rootScope', '$routeParams', 'usersFact', '$location', function ($scope, $rootScope, $routeParams, usersFact, $location)
    {
        var error = function (response, args)
        {
            $scope.busy = false;
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Register_confirm_error', type: 'danger'});
        }

        var success = function (response, args)
        {
            $scope.busy = false;
            //login
            $rootScope.currentUser = response;
            localStorage.setItem('currentUser', JSON.stringify(response));
            $scope.user = response;

            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Register_confirm_success', type: 'success'});
            $location.path('/profile');
        }

        $scope.busy = true;
        var user = usersFact.confirm({token: $routeParams.token}, success, error);
    }]);
