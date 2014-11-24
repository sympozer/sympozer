/**
 * Edit topic controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$window', 'topicsFact', function ($scope, $rootScope, $routeParams, $window, topicsFact)
{
    $scope.topic = topicsFact.get({id: $routeParams.topicId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'topics.validations.not_created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'topics.validations.created', type: 'success'});
        $window.history.back();
    }

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.topic.$update({}, success, error);
        }
    }
}]);