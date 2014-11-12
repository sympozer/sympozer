/**
 * List topics by event controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsListByEventCtrl', ['$scope', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'topicsFact', '$cachedResource', '$routeParams', function ($scope, GLOBAL_CONFIG, createDialogService, $rootScope, topicsFact, $cachedResource, $routeParams)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
    $scope.topic = topicsFact.get({idEvent: $routeParams.eventId});
}]);