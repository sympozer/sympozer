/**
 * Edit paper controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersEditCtrl', [ '$scope', '$rootScope', '$routeParams', '$location', 'papersFact', function ($scope, $rootScope, $routeParams, $location, papersFact)
{
    $scope.paper = papersFact.get({id: $routeParams.paperId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the paper has not been saved', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'paper saved', type: 'success'});
        $location.path('/conference/' + $rootScope.currentMainEvent.id + '/papers/list');
    };

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.paper.$update({}, success, error);
        }
    }
}]);