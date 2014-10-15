
/**
 * confirm email controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('profileCtrl',
    [ '$scope', '$rootScope', '$routeParams', 'usersFact', '$location', 'personsFact', function ($scope, $rootScope, $routeParams, usersFact, $location, personsFact)
    {
        if (!$scope.$root.currentUser)
        {
            $location.path('/');
        }

        $scope.person = new personsFact($scope.$root.currentUser.person);

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the person has not been saved', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'person saved', type: 'success'});
            $scope.$root.currentUser.person = response;
        }

        $scope.update = function (form)
        {
            if (form.$valid)
            {
                $scope.person.$update({}, success, error);
            }
        }

    }]);
