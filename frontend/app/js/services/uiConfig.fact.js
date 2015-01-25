/**
 * $uiConfig service
 * Manage colors and change style event
 * @type {service}
 */
angular.module('sympozerApp').service('$uiConfig', ['$rootScope', '$document', '$window', function ($rootScope, $document, $window)
{
    this.settings = {
        fixedHeader: true,
        navHeaderHidden: true,
        navLeftCollapsed: false,
        navLeftShown: false,
        navRightCollapsed: false,
        searchCollapsed: false
    };

    this.get = function (key)
    {
        return this.settings[key];
    };

    this.set = function (key, value)
    {
        this.settings[key] = value;
        $rootScope.$broadcast('uiConfig:change', {key: key, value: this.settings[key]});
    };

    $document.ready(function ()
    {
        $window.enquire.register("screen and (max-width: 767px)", {
            match  : function ()
            {
                $rootScope.$broadcast('uiConfig:maxWidth767', true);
            },
            unmatch: function ()
            {
                $rootScope.$broadcast('uiConfig:maxWidth767', false);
            }
        });
    });

}])




