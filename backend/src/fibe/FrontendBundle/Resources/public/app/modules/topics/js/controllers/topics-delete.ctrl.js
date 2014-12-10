/**
 * Delete topic controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsDeleteCtrl', [ '$scope', 'topicModel', function ($scope, topicModel)
{
    $scope.topic = topicModel;
}]);