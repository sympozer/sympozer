'use strict';

/**
 * Global filters
 */

/**
 * Titleize filter
 * Put string first character to upper case
 * @type {filter}
 */
angular.module('sympozerApp').filter('titleize', function ()
{
  return function (input, scope)
  {
    if (input != null)
    {
      return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
  }
});
