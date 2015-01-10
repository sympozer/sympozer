
/**
 * Main Sympozer Angular app controller from FORZA
 */
angular.module('sympozerApp').controller('mainCtrl', ['$scope', '$rootScope', '$global', '$timeout', 'progressLoader', '$location', 'GLOBAL_CONFIG', function ($scope, $rootScope, $global, $timeout, progressLoader, $location, GLOBAL_CONFIG)
{
    /**
     * Getting main html attribute configurations for styles
     */
    $rootScope.style_fixedHeader = $global.get('fixedHeader');
    $rootScope.style_headerBarHidden = $global.get('headerBarHidden');
    $rootScope.style_layoutBoxed = $global.get('layoutBoxed');
    $rootScope.style_fullscreen = $global.get('fullscreen');
    $rootScope.style_leftbarCollapsed = $global.get('leftbarCollapsed');
    $rootScope.style_leftbarShown = $global.get('leftbarShown');
    $rootScope.style_rightbarCollapsed = $global.get('rightbarCollapsed');
    $rootScope.style_eventsFilterBarCollapsed = $global.get('eventsFilterBarCollapsed');

    $rootScope.style_isSmallScreen = false;
    $rootScope.style_showSearchCollapsed = $global.get('showSearchCollapsed');
    $rootScope.style_layoutHorizontal = $global.get('layoutHorizontal');





    /**
     * Event triggered whenever a global change of layout append
     * (usually when the user click somewhere on the app)
     */
    $scope.$on('globalStyles:changed', function (event, newVal)
    {
        $scope['style_' + newVal.key] = newVal.value;
    });
    $scope.$on('globalStyles:maxWidth767', function (event, newVal)
    {
        $timeout(function ()
        {
            $scope.style_isSmallScreen = newVal;
            if (!newVal)
            {
                $global.set('leftbarShown', false);
            }
            else
            {
                $global.set('leftbarCollapsed', false);
            }
        });
    });


    // there are better ways to do this, e.g. using a dedicated service
    // but for the purposes of this demo this will do :P
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
    /**
     * Specify wich accordeons have to be open when the page is loaded
     * @type {{open: boolean}[]}
     */
    $scope.rightbarAccordions = [
        {open: true},
        {open: true},
        {open: true},
        {open: true},
        {open: true},
        {open: true},
        {open: true}
    ];

    /**
     * Progress Bar configuration
     */
    $scope.$on('$routeChangeStart', function (e)
    {
        // console.log('start: ', $location.path());
        progressLoader.start();
        progressLoader.set(50);
    });
    $scope.$on('$routeChangeSuccess', function (e)
    {
        // console.log('success: ', $location.path());
        progressLoader.end();
    });

    //Add app configuration to the rootScope
    $rootScope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    //scrollTop function
    $scope.scrollTop = function ()
    {
        $('html, body').animate({scrollTop: 0}, 'slow');
    }
}]);

