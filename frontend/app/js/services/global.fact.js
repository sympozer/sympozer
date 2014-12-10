/**
 * $global service
 * Manage colors and change style event
 * @type {service}
 */
angular.module('sympozerApp').service('$global', ['$rootScope', 'EnquireService', '$document', function ($rootScope, EnquireService, $document)
{
    this.settings = {
        fixedHeader: true,
        headerBarHidden: true,
        leftbarCollapsed: false,
        leftbarShown: false,
        rightbarCollapsed: false,
        fullscreen: false,
        layoutHorizontal: false,
        layoutHorizontalLargeIcons: false,
        layoutBoxed: false,
        showSearchCollapsed: false
    };

    var brandColors = {
        'default': '#ecf0f1',

        'inverse': '#95a5a6',
        'primary': '#3498db',
        'success': '#2ecc71',
        'warning': '#f1c40f',
        'danger': '#e74c3c',
        'info': '#1abcaf',

        'brown': '#c0392b',
        'indigo': '#9b59b6',
        'orange': '#e67e22',
        'midnightblue': '#34495e',
        'sky': '#82c4e6',
        'magenta': '#e73c68',
        'purple': '#e044ab',
        'green': '#16a085',
        'grape': '#7a869c',
        'toyo': '#556b8d',
        'alizarin': '#e74c3c'
    };

    this.getBrandColor = function (name)
    {
        if (brandColors[name])
        {
            return brandColors[name];
        }
        else
        {
            return brandColors['default'];
        }
    };

    $document.ready(function ()
    {
        EnquireService.register("screen and (max-width: 767px)", {
            match: function ()
            {
                $rootScope.$broadcast('globalStyles:maxWidth767', true);
            },
            unmatch: function ()
            {
                $rootScope.$broadcast('globalStyles:maxWidth767', false);
            }
        });
    });

    this.get = function (key)
    {
        return this.settings[key];
    };
    this.set = function (key, value)
    {
        this.settings[key] = value;
        $rootScope.$broadcast('globalStyles:changed', {key: key, value: this.settings[key]});
        $rootScope.$broadcast('globalStyles:changed:' + key, this.settings[key]);
    };
    this.values = function ()
    {
        return this.settings;
    };
}])
    .factory('EnquireService', ['$window', function ($window)
    {
        return $window.enquire;
    }])



