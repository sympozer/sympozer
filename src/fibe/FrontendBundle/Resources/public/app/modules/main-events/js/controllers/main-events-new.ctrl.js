/**
 * New conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsNewCtrl', [ '$scope', '$rootScope', '$location', 'mainEventsFact', function ($scope, $rootScope, $location, mainEventsFact)
{
    $scope.conference = new mainEventsFact;

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the conference has not been created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'conference created', type: 'success'});
        $location.path('/mainEvents/list');
    };

    $scope.create = function (form)
    {
        if (form.$valid)
        {
            $scope.conference.$create({}, success, error);
        }
    }
}]);
