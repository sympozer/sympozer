/**
 * Show location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsShowCtrl', [ '$scope', '$routeParams', 'locationsFact', function ($scope, $routeParams, locationsFact)
{
    $scope.location = locationsFact.get({id: $routeParams.locationId});

}]);