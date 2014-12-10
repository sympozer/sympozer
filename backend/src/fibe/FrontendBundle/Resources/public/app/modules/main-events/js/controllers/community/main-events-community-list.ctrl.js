
/**
 * List conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsCommunityListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'mainEventsFact', function ($scope, $routeParams, GLOBAL_CONFIG, $rootScope, mainEventsFact)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    $scope.request = mainEventsFact.all;

}]);