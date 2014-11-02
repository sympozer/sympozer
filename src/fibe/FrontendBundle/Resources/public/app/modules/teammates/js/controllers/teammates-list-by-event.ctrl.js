/**
 * List persons by event controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesListByEventCtrl', ['$scope', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'teammatesFact', '$cachedResource', function ($scope, GLOBAL_CONFIG, createDialogService, $rootScope, teammatesFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $scope.person = teammatesFact.get({idEvent: $routeParams.eventId});
}]);