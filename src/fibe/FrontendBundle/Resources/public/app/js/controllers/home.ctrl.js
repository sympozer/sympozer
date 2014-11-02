/**
 * Home controller (first page)
 *
 * @type {controller}
 */
angular.module('sympozerApp').controller('homeCtrl',
  ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'mainEventsFact', function ($scope, $routeParams, GLOBAL_CONFIG, mainEventsFact)
  {
    //initialize map zoom
    $scope.center = { zoom: 2 }

    $scope.mainEvents = mainEventsFact.all()
  }]);