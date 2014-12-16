/**
 * Delete paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersDeleteCtrl', [ '$scope', 'paperModel', 'papersFact', 'pinesNotifications', 'translateFilter', function ($scope, paperModel, papersFact, pinesNotifications, translateFilter)
{
    $scope.paper = paperModel;


    //Error handling if delete request fails
    var error = function (response, args)
    {
        //Notify of error on delete request
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text: translateFilter('response.data.error.message'),
            type: 'error'
        });
    }

    //Success handling if the delete request success
    var success = function (response, args)
    {

        //Notify of success on delete request
        pinesNotifications.notify({
            title: translateFilter('global.validations.success'),
            text: translateFilter('papers.validations.deletion_success'),
            type: 'success'
        });

        //If view is a modal, resolve modal promise with role object
        if($scope.$close)
        {
            $scope.$close($scope.paper);
        }else
        {
            $window.history.back();
        }
    }

    //Cancel event if the view is a modal
    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };

    //Send delete request
    $scope.delete = function ()
    {
        papersFact.delete({id:$scope.paper.id}, success, error);
    }
}]);