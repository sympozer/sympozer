/**
 * Show person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'personsFact', function ($scope, $rootScope, $routeParams, personsFact )
{
    /*
     * @TODO : restore backend communication
     */
    //$scope.person = personsFact.get({id: $routeParams.personId});
    $scope.person = { id:1, firstname : 'Tim',  lastname : 'Berners lee'};

}]);