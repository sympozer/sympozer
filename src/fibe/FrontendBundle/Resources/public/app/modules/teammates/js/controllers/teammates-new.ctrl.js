/**
 * New person controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesNewCtrl', [ '$scope', '$window', '$rootScope', '$location', 'teammatesFact',
    function ($scope, $window, $rootScope, $location, teammatesFact)
    {
        $scope.person = new teammatesFact();

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the person has not been created', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'person created', type: 'success'});
            if($scope.$close){
                $scope.$close($scope.person);
            }else{
                $window.history.back();
            }
        }

        $scope.cancel = function () {
            $scope.$dismiss('cancel');
        };

        $scope.create = function (form)
        {
            if (form.$valid)
            {
                $scope.person.$create({}, success, error);
            }
        }
    }]);