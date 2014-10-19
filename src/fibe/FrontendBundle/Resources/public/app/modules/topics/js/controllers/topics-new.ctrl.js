/**
 * New topic controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsNewCtrl', [ '$scope', '$rootScope', 'topicsFact', '$modalInstance', function ($scope, $rootScope, topicsFact, $modalInstance)
{

    $scope.topic = new topicsFact();
    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the topic has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'topic created', type: 'success'});
        if($modalInstance){
            $modalInstance.close($scope.topic);
        }else{
            $topic.path('/topics/list');
        }
    }

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.topic.$create({}, success, error);
        }
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);
