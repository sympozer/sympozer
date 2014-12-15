/**
 * Edit label role controller
 *
 * @type {controller}
 */
angular.module('roleLabelsApp').controller('roleLabelsEditCtrl',
    [ '$scope', '$window', '$rootScope', '$routeParams', '$location', 'roleLabelsFact', function ($scope, $window, $rootScope, $routeParams, $location, roleLabelsFact)
    {
        $scope.roleLabel = roleLabelsFact.get({id: $routeParams.roleLabelId});

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'roleLabels.validations.not_created', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'roleLabels.validations.created', type: 'success'});
            $window.history.back();
        };

        $scope.update = function (form)
        {
            if (form.$valid)
            {
                $scope.roleLabel.$update({}, success, error);
            }
        }
    }]);