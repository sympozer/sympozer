/**
 * Delete person controller
 * Responsible for the deletion of the person injected in a modal instance. The person to remove is personModel.
 * @type {controller}
 */
angular.module('personsApp').controller('personsDeleteCtrl', [ '$scope', 'personModel', 'pinesNotifications', 'translateFilter', function ($scope, personModel, pinesNotifications, translateFilter)
{
    $scope.person = personModel;

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
//            text: translateFilter('response.data.error.message'),
//            type: 'success'
//        });

        //If view is a modal, resolve modal promise with person object
        if ($scope.$close)
        {
            $scope.$close($scope.person);
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
        $scope.person.$delete({}, success, error);
    }

}]);