/**
 * New organization controller
 *
 * @type {controller}
 */

angular.module('organizationsApp').controller('organizationsNewCtrl', [ '$scope', '$window', '$routeParams', '$rootScope', '$location', 'organizationsFact', 'personModel', function ($scope, $window, $routeParams, $rootScope, $location, organizationsFact, personModel)
{
    $scope.organization = new organizationsFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'organizations.validations.not_created', type: 'danger'});
    }

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'organizations.validations.created', type: 'success'});
        if($scope.$close){
            $scope.$close($scope.organization);
        }else{
            $window.history.back();
        }
    }

    $scope.create = function (form)
    {
        $scope.organization.mainEvent = $routeParams.mainEventId;
        if(personModel){
            $scope.organization.organizationVersionOwner = personModel;
        }
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