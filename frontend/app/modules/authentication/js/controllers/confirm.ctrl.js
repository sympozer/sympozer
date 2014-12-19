/**
 * confirm email controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('confirmCtrl',
    [ '$scope', '$rootScope', '$routeParams', 'usersFact', 'pinesNotifications', 'translateFilter', 'authenticationFact', '$location', function ($scope, $rootScope, $routeParams, usersFact, pinesNotifications, translateFilter, authenticationFact, $location)
    {
        var error = function (response, args)
        {
            $scope.busy = false;
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Register_confirm_error', type: 'danger'});
        };

        var success = function (user)
        {
            $scope.user = user;

            //Modify current user
            authenticationFact.addUser(user);

            //Notify of the signin action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text : translateFilter('authentication.validations.signin_success'),
                type : 'success'
            });

            $location.path('/home/persons/show/' + user.person.id);
        };

        $scope.busy = true;
        var user = usersFact.confirm({token: $routeParams.token}, success, error);
    }]);
