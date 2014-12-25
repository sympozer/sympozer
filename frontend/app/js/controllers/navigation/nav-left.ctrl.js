/**
 * navLeftCtrl
 * Controller component that handles the left navigation bar both horizontal and vertical modes
 */
angular.module('sympozerApp').controller('navLeftCtrl', ['$scope', '$rootScope', '$global', function ($scope, $rootScope, $global)
{
    /**
     * Action that hide the search bar
     */
    $rootScope.hideSearchBar = function ()
    {
        $global.set('showSearchCollapsed', false);
    };

}]);