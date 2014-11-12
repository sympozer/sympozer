/**
 * Show topic controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsShowCtrl', [ '$scope', '$routeParams', 'topicsFact', function ($scope, $routeParams, topicsFact)
{
    $scope.topic = topicsFact.get({id: $routeParams.topicId});

}]);