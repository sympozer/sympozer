/**
 * progress loader service
 * Handles the loading bar
 */
angular.module('sympozerApp').factory('progressLoader', function ()
{
    return {
        start: function ()
        {
            if(this.isLoaded()) {
                $(document).skylo('start');
            }
        },
        set: function (position)
        {
            if(this.isLoaded()) {
                $(document).skylo('set', position);
            }
        },
        end: function ()
        {
            if(this.isLoaded()){
                $(document).skylo('end');

            }
        },
        get: function ()
        {
            return $(document).skylo('get');
        },
        inch: function (amount)
        {
            if(this.isLoaded()) {

                $(document).skylo('show', function () {
                    $(document).skylo('inch', amount);
                });
            }
        },
        isLoaded : function(){
            return  $(document).skylo;
        }
    }

});
