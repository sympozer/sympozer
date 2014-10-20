
/**
 * Home controller (first page)
 *
 * @type {controller}
 */
angular.module('sympozerApp').controller('homeCtrl',
    ['$scope', '$routeParams', 'GLOBAL_CONFIG',
        function ($scope, $routeParams, GLOBAL_CONFIG)
        {
            //initialize map zoom
            $scope.center = { zoom: 2 }

        }]);