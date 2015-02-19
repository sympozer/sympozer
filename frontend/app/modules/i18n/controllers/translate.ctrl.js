/**
 * translateCtrl
 * Handles the local changes
 * @type {controller}
 */
angular.module('i18nApp').controller('translateCtrl', [ '$scope', '$window', 'i18nSrv', '$location', function ($scope, $window, i18nSrv, $location)
{

    var language = i18nSrv.initializeLocal();

    $scope.locals = i18nSrv.locals;

    // Initialize the local language
    $scope.currentLocal = language;

    /**
     * Trigger change local on the dedicated i18n local service
     */
    $scope.changeLocal = function (local)
    {
        i18nSrv.changeLocal(local);

        //Set the current local in root scope for display
        $scope.currentLocal = local;

        //Return to the page the user was before changing the local
        var currentUrl =  $location.url();
        $location.url('/test');
        $location.url(currentUrl);

       //$window.history.back();

        return local;
    };

}]);
