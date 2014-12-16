/**
 * Delete role controller
 * Responsible for the deletion of the role injected in a modal instance. The role to remove is injected as roleModel.
 * @type {controller}
 */
angular.module('rolesApp').controller('rolesDeleteCtrl', [ '$scope', 'roleModel', 'rolesFact', 'pinesNotifications', 'translateFilter', function ($scope, roleModel, rolesFact, pinesNotifications, translateFilter)
{
    $scope.role = roleModel;

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
            text: translateFilter('roles.validations.deletion_success'),
            type: 'success'
        });

        //If view is a modal, resolve modal promise with role object
        if($scope.$close){
            $scope.$close($scope.role);
        }else{
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
        rolesFact.delete({id:$scope.role.id}, success, error);
    }

}]);