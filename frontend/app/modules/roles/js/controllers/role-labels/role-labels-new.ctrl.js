/**
 * New label role controller
 *
 * @type {controller}
 */
angular.module('roleLabelsApp').controller('roleLabelsNewCtrl', [ '$scope', '$routeParams', '$window', '$rootScope', '$location', 'roleLabelsFact', 'pinesNotifications', 'translateFilter', function ($scope, $routeParams, $window, $rootScope, $location, roleLabelsFact, pinesNotifications, translateFilter)
{
    $scope.roleLabel = new roleLabelsFact;

    var error = function (response, args)
    {
        //Notify of the new role label post action error
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text : translateFilter('roleLabels.validations.not_created'),
            type : 'error'
        });
    };

    var success = function (response, args)
    {
        //Notify of the creation action success
        pinesNotifications.notify({
            title: translateFilter('global.validations.success'),
            text : translateFilter('roleLabels.validations.created'),
            type : 'success'
        });

        //If the view is a modal instance, then resolve the promise with the new role label
        if ($scope.$close)
        {
            $scope.$close($scope.roleLabel);
        }
        else
        {
            //go back to previous page otherwise
            $window.history.back();
        }

    };

    //Send post request if form valid
    $scope.create = function (form)
    {

        //Verify form validity
        if (form.$valid)
        {
            $scope.roleLabel.mainEvent = {id: $routeParams.mainEventId};
            roleLabelsFact.create(roleLabelsFact.serialize($scope.roleLabel), success, error);
        }
    }

    //Close the modal (useful only if view is a modal)
    $scope.cancel = function ()
    {
        $scope.$dismiss('cancel');
    };
}]);