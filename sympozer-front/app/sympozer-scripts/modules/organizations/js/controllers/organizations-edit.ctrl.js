/**
 * Edit organization controller
 *
 * @type {controller}
 */
angular.module('organizationsApp').controller('organizationsEditCtrl', [ '$scope', '$window', '$rootScope', '$routeParams', '$location', 'organizationsFact', 'pinesNotifications', 'translateFilter', function ($scope, $window, $rootScope, $routeParams, $location, organizationsFact, pinesNotifications, translateFilter)
{
    //Fetching organization
    $scope.organization = organizationsFact.get({id: $routeParams.organizationId});


    //On error
    var error = function (response, args)
    {
        //Notify of error on organization post request
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text: translateFilter('organizations.validations.not_created'),
            type: 'error'
        });
    }

    var success = function (response, args)
    {
        //Notify of error on post request
        pinesNotifications.notify({
            title: translateFilter('global.validations.success'),
            text: translateFilter('organizations.validations.created'),
            type: 'success'
        });
        $window.history.back();
    }

    //Send put request if organization form valid
    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.organization.$updateVersions({}, success, error);
        }
    }
}]);