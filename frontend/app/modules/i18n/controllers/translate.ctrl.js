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

    //works IE/SAFARI/CHROME/FF : get the preffered langage for the user
    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
      };
    }
    var language = window.navigator.userLanguage || window.navigator.language;
    if (language.startsWith('fr')) {
      language = $scope.locals[1];
    } else {
      language = $scope.locals[0];
    }

    // Initialize the local language
    $scope.currentLocal = language;
    $translate.use(language.code);

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
