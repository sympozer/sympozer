/**
 * Delete location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsDeleteCtrl', [ '$scope', 'locationModel', function ($scope, locationModel)
{
    $scope.location = locationModel;
}]);

