/**
 * List persons by event controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsListByEventCtrl', ['$scope', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'personsFact', '$cachedResource', '$routeParams', function ($scope, GLOBAL_CONFIG, createDialogService, $rootScope, personsFact, $cachedResource, $routeParams)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $scope.person = personsFact.get({idEvent: $routeParams.eventId});
}]);