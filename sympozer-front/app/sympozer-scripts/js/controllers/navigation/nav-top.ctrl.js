/**
 * navTopCtrl
 * Controller component that handles the fixed top navigation bar
 */
sympozerApp.controller('navTopCtrl', ['$scope', '$rootScope', '$global', function ($scope, $rootScope, $global)
{
    // there are better ways to do this, e.g. using a dedicated service
    // but for the purposes of this demo this will do :P
    $rootScope.isLoggedIn = true;
    $rootScope.logOut = function ()
    {
        $rootScope.isLoggedIn = false;
    };
    $rootScope.logIn = function ()
    {
        $rootScope.isLoggedIn = true;
    };

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