/**
 * List (all) persons controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsCommunityIndexCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'personsFact', function ($scope, $routeParams, GLOBAL_CONFIG, $rootScope, personsFact)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    $scope.request = personsFact.all;


}]);