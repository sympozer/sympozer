/**
 * Delete conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsDeleteCtrl', [ '$scope', '$rootScope', 'conferenceModel', function ($scope, $rootScope, conferenceModel)
{
    $scope.conference = conferenceModel;
}]);