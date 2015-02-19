/**
 * I18n App service
 * Manage the current language settings
 * @type {Service}
 */
angular.module('i18nApp').factory('i18nSrv', ['GLOBAL_CONFIG', '$translate', function (GLOBAL_CONFIG, $translate)
{
    var i18nSrv = {

        locals : [
            { label: 'English', code: 'en_US', src: GLOBAL_CONFIG.app.urls.img + '/english-flag.png'},
            { label: 'Français', code: 'fr_FR', src: GLOBAL_CONFIG.app.urls.img + '/french-flag.png'}
        ],

        getBrowserLocal: function () {
            return window.navigator.userLocal || window.navigator.language;
        },

        initializeLocal: function (language) {
            var storedLocal = localStorage.getItem('currentLocal') || null;
            var browserLocal = i18nSrv.getBrowserLocal() || null;

            //Test if a language had been choosen and stored before
            if(storedLocal){
                i18nSrv.changeLocal(JSON.parse(storedLocal));
            }
            //Try to get the browser language
            else if (browserLocal){

                //works IE/SAFARI/CHROME/FF : get the preffered langage for the user
                if (typeof String.prototype.startsWith != 'function') {
                    String.prototype.startsWith = function (str){
                        return this.slice(0, str.length) == str;
                    };
                }

                //Set current language to fr or en
                if (browserLocal.startsWith('fr')) {
                    i18nSrv.changeLocal(i18nSrv.locals[1])
                } else {
                    i18nSrv.changeLocal(i18nSrv.locals[0])
                }
            }
            //"En" Default choice if no stored language or browser language
            else{
                i18nSrv.changeLocal(i18nSrv.locals[0])
            }
            return i18nSrv.currentLocal;
        },

        /**
         * change language
         */
        changeLocal: function (local) {
            //Configure the translate plugin
            $translate.use(local.code);

            //
            i18nSrv.currentLocal = local;

            localStorage.setItem('currentLocal', JSON.stringify(local));

            return local;
        },


        /**
         * get the current local
         */
        getCurrentLocal : function () {
            return i18nSrv.currentLocal;
        },

        /**
         * get the current local
         */
        getCurrentLocalCode : function () {
            return i18nSrv.currentLocal.code;
        }

}




return i18nSrv;
}]);
