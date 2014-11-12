/**
 * Nav left controller (left panel controller)
 *
 * @type {controller}
 */
angular.module('sympozerApp').controller('navLeftCtrl',
  ['$scope', '$routeParams', 'GLOBAL_CONFIG',
    function ($scope, $routeParams, GLOBAL_CONFIG)
    {
      $scope.sympozerLogoPath = GLOBAL_CONFIG.sympozerLogoPath;
      $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
      };
    }]);
