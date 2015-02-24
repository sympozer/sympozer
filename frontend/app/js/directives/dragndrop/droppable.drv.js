/**
 * droppable directive
 * used to make an element drippable
 */
angular.module('sympozerApp').directive('droppable', function($compile) {
    return {
        restrict: 'A',
        scope : {
            drop : '&',
            out : '&',
            over : '&'
        },
        link: function(scope,element,attrs){

            //This makes an element Droppable
            element.droppable(
            {
                drop: function (event, ui) {
                    scope.drop(event, ui);

                },
                //A draggable object is dragged over the droppable zone
                out: function (event, ui) {
                    scope.out(event, ui);
                },
                //A draggable object is dragged out of the droppable zone
                over: function (event, ui) {
                    scope.over(event, ui);
                }
            });
        }
    };
});