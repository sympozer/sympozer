/**
 * progress loader service
 * Handles the loading bar
 */
angular.module('sympozerApp').factory('progressLoader', function ()
{
    return {
        start: function ()
        {
            $(document).skylo('start');
        },
        set: function (position)
        {
            $(document).skylo('set', position);
        },
        end: function ()
        {
            $(document).skylo('end');
        },
        get: function ()
        {
            return $(document).skylo('get');
        },
        inch: function (amount)
        {
            $(document).skylo('show', function ()
            {
                $(document).skylo('inch', amount);
            });
        }
    }

});
