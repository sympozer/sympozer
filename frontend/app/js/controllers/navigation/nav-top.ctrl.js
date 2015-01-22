/**
 * navTopCtrl
 * Controller component that handles the fixed top navigation bar
 */
angular.module('sympozerApp').controller('navTopCtrl', ['$scope', '$rootScope', '$uiConfig', function ($scope, $rootScope, $uiConfig)
{


    /**
     * Action that toggle the left menu bar
     */
    $rootScope.toggleNavLeft = function ()
    {
        $uiConfig.set('navLeftCollapsed', !$scope.ui_navLeftCollapsed);
    };

    /**
     * Action that toggle the right bar
     */
    $rootScope.toggleNavRight = function ()
    {
        $uiConfig.set('navRightCollapsed', !$scope.ui_navRightCollapsed);
    };


}]);