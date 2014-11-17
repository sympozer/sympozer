/**
 * reset password request controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('resetPwdRequestCtrl', [ '$scope', '$window', '$routeParams', 'usersFact', '$location', '$modal', 'pinesNotifications', 'translateFilter', 'GLOBAL_CONFIG', function ($scope, $window, $routeParams, usersFact, $location, $modal, pinesNotifications, translateFilter, GLOBAL_CONFIG)
{

    //Initialize user
    $scope.user = {};

    var error = function (response, args)
    {
        //Notify of the password change request action error
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text : translateFilter('response.data.error'),
            type : 'error'
        });
    };

    var success = function (response, args)
    {
        //Notify of the password change request action success
        pinesNotifications.notify({
            title: translateFilter('global.validations.success'),
            text : translateFilter('authentication.validations.reset_pwd_request_sended'),
            type : 'success'
        });

        //Close modal
        if ($scope.$close)
        {
            $scope.$close();
        }
    };

    //Manage the forgotten password modal
    $scope.showForgottenPwdPopup = function ()
    {
        //Open forgotten password modal
        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.authentication.urls.partials + 'reset-pwd-request.html',
            controller : 'resetPwdRequestCtrl',
            size       : "large"
        });
    };

    $scope.resetPwdRequestAction = function (resetPwdRequestForm)
    {
        if (resetPwdRequestForm.$valid)
        {
            usersFact.resetpwdrequest({"username": $scope.user.username}, success, error);
        }
    };
}]);