/**
 * New organization controller
 *
 * @type {controller}
 */

angular.module('organizationsApp').controller('organizationsNewCtrl', [ '$scope', '$window', '$routeParams', '$rootScope', '$location', 'organizationsFact', function ($scope, $window, $routeParams, $rootScope, $location, organizationsFact)
{
    $scope.organization = new organizationsFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the organization has not been created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'organization created', type: 'success'});
        if($scope.$close){
            $scope.$close($scope.organization);
        }else{
            $window.history.back();
        }
    }

    $scope.create = function (form)
    {
        $scope.organization.mainEvent = $routeParams.mainEventId;
        if (form.$valid)
        {
            $scope.organization.$create({}, success, error);
        }
    }

    $scope.cancel = function () {
        $scope.$dismiss('cancel');
    };
}
]);