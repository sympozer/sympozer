/**
 * List (all) persons controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsCommunityIndexCtrl', ['$scope', 'personsFact', function ($scope, personsFact)
{
    //Prepare entitties object for list entity handler directive
    $scope.entities = [];

    //Fetch all persons
    $scope.request = personsFact.all;

}]);