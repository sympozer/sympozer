'use strict';

/**
 * Global filters
 */

/**
 * Titleize filter
 * Put string first character to upper case
 * @type {filter}
 */
angular.module('sympozerApp').filter('highlightQuery', function ()
{
    return function (input, query)
    {
        if (query === '')
        {
            return input;
        }
        return input.replace(RegExp('(' + query + ')', 'i'), '<b>$1</b>');
    }
});