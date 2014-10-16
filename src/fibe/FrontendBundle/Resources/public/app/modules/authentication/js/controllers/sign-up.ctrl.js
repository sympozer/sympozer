/**
 * Sign up controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('signupCtrl',
    ['$scope', '$rootScope', '$location', '$routeParams', 'GLOBAL_CONFIG', 'usersFact', function ($scope, $rootScope, $location, $routeParams, GLOBAL_CONFIG, usersFact)
    {
        $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
        $scope.user = {};

        var error = function (response, args)
        {
            $scope.busy = false;
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: response.data.error, type: 'danger'});
        }
        var success = function (response, args)
        {
            $scope.busy = false;
            $scope.user = response;
            $rootScope.currentUser = response;
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Register_success', type: 'success'});
            $location.path('/');
        }
        $scope.signupAction = function (signupForm)
        {
            $scope.busy = true;
            usersFact.signup({fos_user_registration_form: $scope.user}, success, error);
        }

    }]);
