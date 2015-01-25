/**
 * Main Sympozer Angular app controller
 */
angular.module('sympozerApp').controller('mainCtrl', ['$scope', '$rootScope', '$uiConfig', '$timeout', 'progressLoader', '$location', 'GLOBAL_CONFIG', function ($scope, $rootScope, $uiConfig, $timeout, progressLoader, $location, GLOBAL_CONFIG)
{
    /**
     * Getting main html attribute configurations for the ui from the uiConfig factory
     */
    $rootScope.ui_navHeaderHidden = $uiConfig.get('navHeaderHidden');
    $rootScope.ui_navLeftCollapsed = $uiConfig.get('navLeftCollapsed');
    $rootScope.ui_navLeftShown = $uiConfig.get('navLeftShown');
    $rootScope.ui_navRightCollapsed = $uiConfig.get('navRightCollapsed');
    $rootScope.ui_searchCollapsed = $uiConfig.get('searchCollapsed');
    $rootScope.ui_eventsFilterBarCollapsed = $uiConfig.get('eventsFilterBarCollapsed');
    $rootScope.ui_isSmallScreen = false;


    $scope.toggleNavLeft = function ()
    {
        if ($rootScope.ui_isSmallScreen)
        {
            return $uiConfig.set('navLeftShown', !$uiConfig.get('navLeftShown'));
        }
        $uiConfig.set('navLeftCollapsed', !$uiConfig.get('navLeftCollapsed'));
    };

    /**
     * Event triggered whenever a global change of layout append
     * (usually when the user click somewhere on the app)
     */
    $scope.$on('uiConfig:change', function (event, newVal)
    {
        $scope['ui_' + newVal.key] = newVal.value;
    });

    $scope.$on('uiConfig:maxWidth767', function (event, newVal)
    {
        $timeout(function ()
        {
            $rootScope.ui_isSmallScreen = newVal;
            if (!newVal)
            {
                $uiConfig.set('navLeftShown', false);
            }
            else
            {
                $uiConfig.set('leftbarCollapsed', false);
            }
        });
    });



    $scope.isContextMainEvent = true;
    $scope.setContextMainEventOn = function ()
    {
        $scope.isContextMainEvent = true;
    };
    $scope.setContextMainEventOff = function ()
    {
        $scope.isContextConference = false;
    };


    /**
     * Specify if the right accordeon show only one element at a time of severals
     * @type {boolean}
     */
    $scope.rightbarAccordionsShowOne = false;


    //Add app configuration to the rootScope
    $rootScope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    //scrollTop function
    $scope.scrollTop = function ()
    {
        $('html, body').animate({scrollTop: 0}, 'slow');
    }
}]);

