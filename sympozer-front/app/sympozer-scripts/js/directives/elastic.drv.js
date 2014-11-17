/**
 * Directive wich will do automatic height size for elements (like for textarea)
 *
 * @Author : Vincent Sébille
 *
 * DESCRIPTION :
 *
 * Each time the user press a key, the 'element' with the 'elastic' directive
 * resize itself (in height only).
 *
 * It's still possible to control size in css. Example :
 *    min-height: 10em;
 *    max-height: 20em;
 * --> Will limit the min & max height of the element
 *
 */
angular.module('sympozerApp').directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                // Function that resize automaticly every element with the 'elastic' directive
                var resize = function() {
                    element[0].style.height = "1px";
                    return element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                // The events wich trigger the resize function
                element.on("blur keyup change", resize);
                // Necessary in order to have the correct scrollHeight
                $timeout(resize, 0);
            }
        };
    }
]);