
/**
 * List conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsCommunityIndexCtrl', ['$scope', 'mainEventsFact', function ($scope, mainEventsFact)
{

    $scope.entities = [];

    $scope.request = mainEventsFact.all;

}]);