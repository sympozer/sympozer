/**
 * List persons event controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsEventListCtrl', ['$scope', '$routeParams', '$rootScope', 'rolesFact', function ($scope, $routeParams, $rootScope, rolesFact)
{
    $scope.roles = rolesFact.all({'filters[personId]' : $routeParams.personId});
}]);