/**
 * New organization controller
 *
 * @type {controller}
 */

angular.module('organizationsApp').controller('organizationsNewCtrl', [ '$scope', '$window', '$routeParams', '$rootScope', '$location', 'organizationsFact', 'personModel', 'pinesNotifications', 'translateFilter', function ($scope, $window, $routeParams, $rootScope, $location, organizationsFact, personModel, pinesNotifications, translateFilter)
{
    //Prepare a new Organization Resource object
    $scope.organization = new organizationsFact;


    //On new organization post fail
    var error = function (response, args)
    {
        //Notify of error on post request
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text : translateFilter('organizations.validations.not_created'),
            type : 'error'
        });
    }

    //On new organization post success
    var success = function (response, args)
    {
        //Notify of success on post request
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text : translateFilter('organizations.validations.created'),
            type : 'error'
        });

        //If view is in a modal instance, close it. Go back to previous page otherwise
        if ($scope.$close)
        {
            $scope.$close($scope.organization);
        }
        else
        {
            $window.history.back();
        }
    }

    //Create organization version workflow
    $scope.create = function (form)
    {
        //@TODO: define the organization workflow more precisely
        $scope.organization.mainEvent = {id: $routeParams.mainEventId};

        //If organization version created from person, then set the owner
        if (personModel)
        {
            //personModel.acl.delete();
            $scope.organization.organizationVersionOwner = personModel;
        }

        //Form validation
        if (form.$valid)
        {
            //New organization version creation
            $scope.organization.$createVersions({}, success, error);
        }
    }

    //Click on modal "cancel" button action
    $scope.cancel = function ()
    {
        $scope.$dismiss('cancel');
    };
}
]);