
/**
 * confirm email controller
 * Handles the workflow for changing a user password
 * @type {controller}
 */
angular.module('authenticationApp').controller('changePwdCtrl',
    [ '$scope', '$routeParams', 'usersFact', '$location', 'pinesNotifications', 'translateFilter', 'authenticationFact', function ($scope, $routeParams, usersFact, $location, pinesNotifications, translateFilter, authenticationFact)
    {
        var error = function (response, args)
        {
            //Notify of the password change password action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('authentication.validations.change_pwd_error'),
                type: 'error'
            });
        }

        var success = function (user, args)
        {
            //Notify of the password change password action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('authentication.validations.change_pwd_success'),
                type: 'success'
            });

            //Modify current user
            authenticationFact.addUser(user);

            $location.path('/home/persons/profile');
        }

        //Send change password request to server
        $scope.changePwdAction = function (changePwdForm)
        {
            usersFact.changepwd(changePwdForm, success, error);
        }
    }]);
