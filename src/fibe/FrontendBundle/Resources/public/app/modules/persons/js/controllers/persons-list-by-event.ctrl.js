/**
 * List persons by event controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsListByEventCtrl', ['$scope', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'personsFact', '$cachedResource', function ($scope, GLOBAL_CONFIG, createDialogService, $rootScope, personsFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $scope.person = personsFact.get({idEvent: $routeParams.eventId});
}]);