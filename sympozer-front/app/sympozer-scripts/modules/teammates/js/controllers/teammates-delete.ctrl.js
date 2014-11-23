/**
 * Delete teammate controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesDeleteCtrl',
    [ '$scope', 'teammateModel', 'teammatesFact', 'pinesNotifications', 'translateFilter', function ($scope, teammateModel, teammatesFact, pinesNotifications, translateFilter)
    {
        $scope.teammate = new teammatesFact(teammateModel);

        var success = function (response, args)
        {
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text : translateFilter('teammates.validations.deleted'),
                type : 'success'
            });
            $scope.$close($scope.teammate);
        };

        $scope.confirmDelete = function (teammateModel)
        {
            teammateModel.$delete(success);
        }
    }]);