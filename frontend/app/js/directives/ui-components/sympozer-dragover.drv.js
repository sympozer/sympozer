/**
 * icheck directive
 * use to handle i check plugin for checkboxes
 */
angular.module('sympozerApp').directive('sympozerDragover', function ($timeout, $parse)
{
    return {
        require: '?ngModel',
        link   : function ($scope, element, attrs)
        {
            element.css({border: "dashed #DDD 3px", padding: "1.5em"});
            element.on('dragover', dragover, false);
            element.on('dragenter', dragenter, false);

            function dragover(e)
            {
                this.css({"border-color": "#DDD"});
                return false;
            }

            function dragenter(e)
            {
                this.css({"border-color": "#BBB"});
                return false;
            }
        }
    };
})