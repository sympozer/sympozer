/**
 * Main controller
 *
 * @type {controller}
 */
angular.module('sympozerApp').controller('mainCtrl',
    ['$scope', '$rootScope', '$routeParams', 'GLOBAL_CONFIG', 'uiSelectConfig',
        function ($scope, $rootScope, $routeParams, GLOBAL_CONFIG, uiSelectConfig)
        {
            $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
            $rootScope.GLOBAL_CONFIG = GLOBAL_CONFIG;

            debugger;
            uiSelectConfig.theme = GLOBAL_CONFIG.app.urls.partials +'select2/';

            $scope.scrollTop = function ()
            {
                $('html, body').animate({scrollTop: 0}, 'slow');
            }
        }]);

