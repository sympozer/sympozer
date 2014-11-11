'use strict';

/**
 * inarray filter
 * Vérify that a specified array contains a specific key/value
 * @param key, the key to find in the array
 * @param value, the value of the key to find in the array
 * @param array, the array to look in
 * @type {filter}
 */
angular.module('sympozerApp').filter('inArray', function ()
{
    return function (key, value, array)
    {
        //Arguments check
        if (!key || !value || !array)
        {
            return;
        }

        //Find object in array
        var results = $.grep(array, function (n)
        {
            return n[key] == value;
        });

        return results.length != 0;
    }
});
