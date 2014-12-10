/**
 * Edit category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesEditCtrl', [ '$scope', '$window', '$rootScope', '$routeParams', '$location', 'categoriesFact', function ($scope, $window,  $rootScope, $routeParams, $location, categoriesFact)
{
    $scope.category = categoriesFact.get({id: $routeParams.categoryId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'categories.validations.not_created', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'categories.validations.created', type: 'success'});
        $window.history.back();
    };

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.category.$update({}, success, error);
        }
    }
}]);