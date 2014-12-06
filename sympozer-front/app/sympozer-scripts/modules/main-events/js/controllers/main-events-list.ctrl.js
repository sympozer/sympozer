
/**
 * List conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'mainEventsFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, $rootScope, mainEventsFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    $scope.request = mainEventsFact.all;

    $scope.clone = function (conference, index)
    {

        var cloneConference = angular.copy(conference);
        delete cloneConference.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Conference saved', type: 'success'});
            $scope.entities.splice(index + 1, 0, response);
        };

        cloneConference.$create({}, success, error);
    };


}]);