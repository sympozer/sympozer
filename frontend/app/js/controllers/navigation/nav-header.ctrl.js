/**
 * HeaderBarCtrl
 * Controller component that handles the header nav bar with tiles
 */
angular.module('sympozerApp').controller('navHeaderCtrl', ['$scope', '$rootScope', '$uiConfig', function ($scope, $rootScope, $uiConfig)
{
    /**
     * Action that hide the header bar
     */
    $rootScope.hideHeaderBar = function ()
    {
        $uiConfig.set('navHeaderHidden', true);
    };

    /**
     * Action that show the header bar
     */
    $rootScope.showHeaderBar = function ($event)
    {
        $event.stopPropagation();
        $uiConfig.set('navHeaderHidden', false);
    };


}]);