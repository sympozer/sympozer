/**
 * New paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersNewCtrl', [ '$scope', '$rootScope', '$location', 'papersFact', function ($scope, $rootScope, $location, papersFact)
{
    $scope.paper = new papersFact(papersFact.current);

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the paper has not been created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper created', type: 'success'});
        $location.path('/conference/' + $rootScope.currentMainEvent.id + '/papers/list');

    };

    $scope.create = function (form)
    {
        $scope.paper.mainEvent = $rootScope.currentMainEvent.id;
        if (form.$valid)
        {
            $scope.paper.$create({}, success, error);
        }
    }
}]);