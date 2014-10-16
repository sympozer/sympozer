/**
 * Edit topic controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$topic', 'topicsFact', function ($scope, $rootScope, $routeParams, $topic, topicsFact)
{
    $scope.topic = topicsFact.get({id: $routeParams.topicId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the topic has not been saved', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'topic saved', type: 'success'});
        $topic.path('/topics/list');
    }

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.topic.$update({}, success, error);
        }
    }
}]);