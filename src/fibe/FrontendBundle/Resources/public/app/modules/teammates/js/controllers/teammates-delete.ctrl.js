/**
 * Delete person controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesDeleteCtrl', [ '$scope', 'personModel', function ($scope, personModel)
{
    $scope.person = personModel;
}]);