/**
 * $uiConfig service
 * Manage colors and change style event
 * @type {service}
 */
angular.module('sympozerApp').service('$uiConfig', ['$rootScope', '$document', function ($rootScope, $document)
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

}])




