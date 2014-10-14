/**
 * Nav top controller (top panel controller)
 *
 * @type {controller}
 */
angular.module('sympozerApp').controller('navTopCtrl',
    ['$translate', '$scope', '$routeParams', 'GLOBAL_CONFIG',
        function ($translate, $scope, $routeParams, GLOBAL_CONFIG)
        {
            $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
            $scope.toggleNavLeft = function ()
            {
                var localWrapper = $("#wrapper");
                localWrapper.removeClass("active-right");
                localWrapper.toggleClass("active-left");
            };

            $scope.locals = [
                { label: 'EN', code: 'en_US', src: GLOBAL_CONFIG.app.urls.img + '/english-flag.png'},
                { label: 'FR', code: 'fr_FR', src: GLOBAL_CONFIG.app.urls.img + '/french-flag.png'}
            ];

            $scope.changeLocal = function (local)
            {
                $translate.use(local.code);
                return local;
            };

        }]);