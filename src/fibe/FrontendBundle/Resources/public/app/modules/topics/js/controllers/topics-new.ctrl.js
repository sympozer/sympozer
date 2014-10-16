/**
 * New topic controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsNewCtrl', [ '$scope', '$rootScope', '$topic', 'topicsFact', function ($scope, $rootScope, $topic, topicsFact)
{
    $scope.topic = new topicsFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the topic has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'topic created', type: 'success'});
        $topic.path('/topics/list');
    }

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.topic.$create({}, success, error);
        }
    }
}]);
