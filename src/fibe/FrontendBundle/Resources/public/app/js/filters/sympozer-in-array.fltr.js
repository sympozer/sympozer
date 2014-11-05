'use strict';

/**
 * inarray filter
 * Vérify that a specified array contains a specific object according to a key
 * @type {filter}
 */
angular.module('sympozerFilters', []).filter('inArray', function ()
{
    return function (key, value, array)
    {
        //Arguments check
        if(!key || !value || !array){
            return;
        }


        //Find object in array
        var results = $.grep(array, function(n, i){
            return n[key] == value;
        });

        if(results.length == 0){
            return false;
        }

        return true;

    }
});
