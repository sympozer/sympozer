/**
 * New topic controller
 *
 * @type {controller}
 */
angular.module('topicsApp').controller('topicsNewCtrl', [ '$scope', '$rootScope', 'GLOBAL_CONFIG', 'topicsFact','$modal','pinesNotifications',
    function ($scope, $rootScope,GLOBAL_CONFIG,topicsFact,$modal,pinesNotifications)
    {

        $scope.topic = new topicsFact();

         

        var error = function (response, args)
        {   
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('topics.validations.not_created'),
                type: 'danger'
            });
        };

       

        var success = function (response, args)
        {
             pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('topics.validations.created'),
                type: 'success'
            });
            if($scope.$close){
                $scope.$close($scope.topic);
            }else{
                $window.history.back();
            }
        };

        $scope.create = function (form)
        {
            if (form.$valid)
            {
                $scope.topic.$create({}, success, error);
            }
        };

        $scope.cancel = function () {
            $scope.$dismiss('cancel');
        };

    }]);
