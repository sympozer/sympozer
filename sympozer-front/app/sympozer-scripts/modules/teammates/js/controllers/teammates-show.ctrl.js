/**
 * Show teammate controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesShowCtrl',
    [ '$scope', '$routeParams', 'teammatesFact', function ($scope, $routeParams, teammatesFact)
    {
        $scope.teammate = teammatesFact.get({id: $routeParams.teammateId});

    }]);
