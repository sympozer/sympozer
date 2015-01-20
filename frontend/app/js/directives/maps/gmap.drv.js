'use strict';

/**
 * gmap directive
 *
 * @Description :
 * Directive for gmap plugin interaction
 * @example :  <div gmap options="{ lat: -12.043333,lng: -77.028333}" instance="geoCodingMapInstance"></div>
 * @type {directive}
 */
angular.module('sympozerApp') .directive('gmap', ['$timeout', 'GMaps', function ($timeout, GMaps)
{
    return {
        restrict: 'A',
        scope: {
            options: '=',
            instance: '@'
        },
        link: function (scope, element, attr)
        {
            //Generating id if no id proposed for the instance
            if (!attr.id)
            {
                attr.id = Math.random().toString(36).substring(7);
                element.attr('id', attr.id);
            }
            scope.options.el = '#' + attr.id;

            //Declare new panorama if argument found
            if (attr.panorama !== undefined)
            {
                GMaps.newPanorama(scope.options, scope.instance);
            }
            //Generate a new map instance
            else
            {
                GMaps.new(scope.options, scope.instance);
            }
        }
    }
}])