/**
 * translateCtrl
 * Handles the local changes
 * @type {controller}
 */
angular.module('i18nApp').controller('translateCtrl', [ '$scope', '$rootScope', '$translate', '$window', 'GLOBAL_CONFIG', function ($scope, $rootScope, $translate, $window, GLOBAL_CONFIG)
{

    /**
     * Mocked list of locals
     * @TODO : use a real list of locals
     */
    $scope.locals = [
        { label: 'English', code: 'en_US', src: GLOBAL_CONFIG.app.urls.img + '/english-flag.png'},
        { label: 'Français', code: 'fr_FR', src: GLOBAL_CONFIG.app.urls.img + '/french-flag.png'}
    ];


    //Initialize current local to 'en_US'
    $scope.currentLocal = $scope.locals[0];

    /**
     * Changes on local
     */
    $scope.changeLocal = function (local)
    {
        //Configure the translate plugin
        $translate.use(local.code);

        //Set the current local in root scope for display
        $scope.currentLocal = local;

        //Return to the page the user was before changing the local
        $window.history.back();

        return local;
    };

}]);
