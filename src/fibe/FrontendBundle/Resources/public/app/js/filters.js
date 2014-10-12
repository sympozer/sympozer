'use strict';

/**
 * Global filters
 */

/**
 * Checkmark filter
 *
 * Description :
 * Convert boolean values to unicode checkmark (v) or cross (x)
 * (true --> check image, false --> cross image)
 *
 * @type {filter}
 */
angular.module('sympozerFilters', []).filter('checkmark', function ()
{
  return function (input)
  {
    return input ? '\u2713' : '\u2718';
  };
}).filter('titleize', function() {
  return function(input, scope) {
    if (input!=null)
      return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});
