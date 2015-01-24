'use strict';

/**
 * Global filters
 */

/**
 * dateToISO filter
 * format dates from db in this format:
 *
 * use it like :
 *      <span class="date">{{ t.created_at | dateToISO | date:"EEEE, MMMM d,y hh:mm:ss a" }}</span>
 *
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