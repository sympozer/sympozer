/**
 * Delete location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsDeleteCtrl', [ '$scope', 'locationModel', 'locationsFact', 'pinesNotifications', 'translateFilter', function ($scope, locationModel, locationsFact, pinesNotifications, translateFilter)
{
    $scope.location = locationModel;

    //Error handling if delete request fails
    var error = function (response, args)
    {
        //Notify of error on delete request
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text : translateFilter('response.data.error.message'),
            type : 'error'
        });
    }

    //Success handling if the delete request success
    var success = function (response, args)
    {

        //Notify of success on delete request
//        pinesNotifications.notify({
//            title: translateFilter('global.validations.success'),
//            text: translateFilter('locations.validations.deletion_success'),
//            type: 'success'
//        });

        //If view is a modal, resolve modal promise with role object
        if ($scope.$close)
        {
            $scope.$close($scope.location);
        }
        else
        {
            $window.history.back();
        }
    }

    //Cancel event if the view is a modal
    $scope.cancel = function ()
    {
        $scope.$dismiss('cancel');
    };

    //Send delete request
    $scope.delete = function ()
    {
        locationsFact.delete($scope.location, success, error);
    }
}]);

