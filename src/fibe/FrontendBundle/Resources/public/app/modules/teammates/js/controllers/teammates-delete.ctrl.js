/**
 * Delete teammate controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesDeleteCtrl',
    [ '$scope', 'teammateModel', function ($scope, teammateModel)
    {
        $scope.teammate = teammateModel;
    }]);