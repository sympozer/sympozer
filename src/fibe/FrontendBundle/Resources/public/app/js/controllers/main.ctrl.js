/**
 * Main controller
 *
 * @type {controller}
 */
angular.module('sympozerApp').controller('mainCtrl',
    ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG',
        function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG)
        {
            $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
            $rootScope.GLOBAL_CONFIG = GLOBAL_CONFIG;
            $scope.scrollTop = function ()
            {
                $('html, body').animate({scrollTop: 0}, 'slow');
            }
        }]);

