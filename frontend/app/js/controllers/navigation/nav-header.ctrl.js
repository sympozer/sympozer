/**
 * HeaderBarCtrl
 * Controller component that handles the header nav bar with tiles
 */
angular.module('sympozerApp').controller('navHeaderCtrl', ['$scope', '$rootScope', '$global', function ($scope, $rootScope, $global)
{
    /**
     * Action that hide the header bar
     */
    $rootScope.hideHeaderBar = function ()
    {
        $global.set('headerBarHidden', true);
    };

    /**
     * Action that show the header bar
     */
    $rootScope.showHeaderBar = function ($event)
    {
        $event.stopPropagation();
        $global.set('headerBarHidden', false);
    };


}]);