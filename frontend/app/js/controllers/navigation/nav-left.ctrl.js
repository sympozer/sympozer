/**
 * navLeftCtrl
 * Controller component that handles the left navigation bar both horizontal and vertical modes
 */
angular.module('sympozerApp').controller('navLeftCtrl', ['$scope', '$rootScope', '$uiConfig', function ($scope, $rootScope, $uiConfig)
{
    /**
     * Action that hide the search bar
     */
    $rootScope.hideSearchBar = function ()
    {
        $uiConfig.set('searchCollapsed', false);
    };

}]);