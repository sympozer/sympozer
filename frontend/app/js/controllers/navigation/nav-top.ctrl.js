/**
 * navTopCtrl
 * Controller component that handles the fixed top navigation bar
 */
angular.module('sympozerApp').controller('navTopCtrl', ['$scope', '$rootScope', '$global', function ($scope, $rootScope, $global)
{


    /**
     * Action that toggle the left menu bar
     */
    $rootScope.toggleLeftBar = function ()
    {
        if ($rootScope.style_isSmallScreen)
        {
            return $global.set('leftbarShown', !$scope.style_leftbarShown);
        }
        $global.set('leftbarCollapsed', !$scope.style_leftbarCollapsed);
    };

    /**
     * Action that toggle the right bar
     */
    $rootScope.toggleRightBar = function ()
    {
        $global.set('rightbarCollapsed', !$scope.style_rightbarCollapsed);
    };


}]);