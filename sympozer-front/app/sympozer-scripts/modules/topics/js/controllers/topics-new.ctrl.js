/**
 * New topic controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsNewCtrl', [ '$scope', '$rootScope', 'topicsFact',
    function ($scope, $rootScope, topicsFact)
    {

        $scope.topic = new topicsFact();
        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'topics.validations.not_created', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'topics.validations.created', type: 'success'});
            if($scope.$close){
                $scope.$close($scope.topic);
            }else{
                $window.history.back();
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
            $scope.$dismiss('cancel');
        };

    }]);
