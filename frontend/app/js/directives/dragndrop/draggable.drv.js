/**
 * draggable directive
 * used to make an element draggable
 */
angular.module('sympozerApp').directive('draggable', function($compile) {
    return {
        restrict: 'A',
        scope: {
            dragstart: '&',
            dragging: '&',
            dragstop: '&'
        },
        link: function (scope, element, attr) {

            //This makes an element Draggable
            $(element).draggable({
                containment : 'body',
                cursor: 'move',
                opacity: 0.6,         // opacity fo the element while it's dragged
                revert: true,          // sets the element to return to its start location
                revertDuration: 300,
                zIndex: 1100,
                stack: "div",
                // Start dragging
                start: function (e, ui) {
                    scope.dragstart(e, ui);
                },
                // Triggered until the element is released
                dragging: function () {
                    scope.dragging();
                    e.preventDefault();
                },
                // End of the drag (even without  drop)
                stop: function (e, ui) {
                    scope.dragstop(e);
                }

            })
        }
    };
});