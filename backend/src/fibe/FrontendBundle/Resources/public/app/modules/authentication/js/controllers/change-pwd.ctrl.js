
/**
 * confirm email controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('changePwdCtrl',
    [ '$scope', '$routeParams', 'usersFact', '$location', function ($scope, $routeParams, usersFact, $location)
    {
        var error = function (response, args)
        {
            $scope.busy = false;
            $scope.$root.$broadcast('AlertCtrl:addAlert', {code: response.data.error, type: 'danger'});
        }

        var success = function (response, args)
        {
            $scope.busy = false;
            $scope.$root.$broadcast('AlertCtrl:addAlert', {code: 'Changepwd_success', type: 'success'});
            $scope.$root.currentUser = response;
            localStorage.setItem('currentUser', JSON.stringify(response));
            $location.path('/profile');
        }

        $scope.changePwdAction = function (changePwdForm)
        {
            $scope.busy = true;
            usersFact.changepwd(changePwdForm, success, error);
        }
    }]);
