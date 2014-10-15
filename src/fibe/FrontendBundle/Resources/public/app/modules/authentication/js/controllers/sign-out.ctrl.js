/**
 * Sign out controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('signoutCtrl',
    ['$scope', '$rootScope', '$window', '$routeParams', 'GLOBAL_CONFIG', '$cookieStore', '$location', 'usersFact', function ($scope, $rootScope, $window, $routeParams, GLOBAL_CONFIG, $cookieStore, $location, usersFact)
    {
        $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

        $scope.$on('globalHttpInterceptor:401', $rootScope.logout);
        var error = function (response, args)
        {
            $scope.busy = false;
            $scope.$root.$broadcast('AlertCtrl:addAlert', {code: response.data.error, type: 'danger'});
        }

        var success = function (response, args)
        {
            $scope.busy = false;
            localStorage.removeItem('currentUser');
            $rootScope.currentUser = {};
            $window.history.back();
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'signout_success', type: 'success'});
        }

        $rootScope.signout = function ()
        {
            usersFact.signout({}, success, error);
        }
    }]);
