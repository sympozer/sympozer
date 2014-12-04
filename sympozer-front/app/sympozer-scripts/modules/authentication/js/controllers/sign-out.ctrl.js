/**
 * Sign out controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('signoutCtrl',
    ['$scope', '$rootScope', '$window', '$routeParams', 'pinesNotifications', '$cookieStore', '$location', 'usersFact', 'authenticationFact', 'translateFilter', function ($scope, $rootScope, $window, $routeParams, pinesNotifications, $cookieStore, $location, usersFact, authenticationFact, translateFilter)
    {

        var error = function (response, args)
        {
            //Notify of the signout action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text : translateFilter('response.data.error'),
                type : 'error'
            });
        }

        var success = function (response, args)
        {
            //Clear user from local storage and rootscope
            authenticationFact.removeUser();

            //Notify of the signout action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text : translateFilter('authentication.validations.signout_success'),
                type : 'success'
            });

//            $location.path('/');
        }

        //Send signout request
        $scope.signoutAction = function ()
        {
            usersFact.signout({}, success, error);
        }
    }]);
