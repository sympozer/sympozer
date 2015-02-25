/**
 * Show person controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsShowCtrl', [ '$scope', '$rootScope', '$routeParams', 'personsFact', 'rolesFact', function ($scope, $rootScope, $routeParams, personsFact, rolesFact )
{

    $scope.person = personsFact.get({id: $routeParams.personId});

    rolesFact.all({'filters[personId]': $routeParams.personId}, function(response){
        $scope.roles = response.results;
        $scope.rolesLoaded = true;
    }, function(){
        $scope.rolesLoaded = true;
    });


}]);