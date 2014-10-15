/**
 * Global authentication controller
 *
 * @type {controller}
 */
angular.module('authenticationApp').controller('globalAuthCtrl',
    ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG)
    {
        $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;


    }]);