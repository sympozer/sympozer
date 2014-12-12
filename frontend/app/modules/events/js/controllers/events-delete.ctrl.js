/**
 * Delete event controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsDeleteCtrl', [ '$scope', 'eventModel', 'eventsFact', 'pinesNotifications', 'translateFilter', function ($scope, eventModel, eventsFact, pinesNotifications, translateFilter)
{
    $scope.event = eventModel;

    //Error handling if delete request fails
    var error = function (response, args)
    {
        //Notify of error on delete request
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text: translateFilter('response.data.error.message'),
            type: 'error'
        });
    };

    //Success handling if the delete request success
    var success = function (response, args)
    {

        //Notify of success on delete request
        pinesNotifications.notify({
            title: translateFilter('global.validations.success'),
            text: translateFilter('events.validations.deletion_success'),
            type: 'success'
        });

        //If view is a modal, resolve modal promise with role object
        if ($scope.$close)
        {
            $scope.$close('ok');
        }
        else
        {
            $window.history.back();
        }
    };

    //Cancel event if the view is a modal
    $scope.cancel = function ()
    {
        $scope.$dismiss('cancel');
    };

    //Send delete request
    $scope.delete = function ()
    {
        eventsFact.delete($scope.event, success, error);
    };
}]);

