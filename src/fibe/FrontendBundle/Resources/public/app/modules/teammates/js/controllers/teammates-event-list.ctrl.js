/**
 * List teammates event controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesEventListCtrl', ['$scope', '$routeParams', '$rootScope', 'rolesFact', function ($scope, $routeParams, $rootScope, rolesFact)
{
    $scope.roles = rolesFact.all({'filters[personId]' : $routeParams.personId});
}]);