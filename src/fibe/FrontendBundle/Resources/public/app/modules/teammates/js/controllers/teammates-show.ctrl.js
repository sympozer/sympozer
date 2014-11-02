/**
 * Show person controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'teammatesFact', function ($scope, $rootScope, $routeParams, teammatesFact )
{
    $scope.person = teammatesFact.get({id: $routeParams.personId});

}]);