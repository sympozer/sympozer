
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

    }]);
