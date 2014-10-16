/**
 * Delete person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsDeleteCtrl', [ '$scope', 'personModel', function ($scope, personModel)
{
    $scope.person = personModel;
}]);