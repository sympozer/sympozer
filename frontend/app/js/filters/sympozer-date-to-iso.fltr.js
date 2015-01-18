'use strict';

/**
 * Global filters
 */

/**
 * Titleize filter
 * Put string first character to upper case
 * @type {filter}
 */
angular.module('sympozerApp').filter('dateToISO', function ()
{
    return function (input)
    {
        if (input)
        {
            input = new Date(input).toISOString();
        }
        return input;
    };
});