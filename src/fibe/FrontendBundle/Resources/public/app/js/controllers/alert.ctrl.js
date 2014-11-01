/**
 * Global alert controller
 *
 * @type {controller}
 */
angular.module('sympozerApp').controller('alertCtrl',
  ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$timeout',
    function ($scope, $routeParams, GLOBAL_CONFIG, $timeout)
    {
      $scope.alerts = [];

      $scope.$on('AlertCtrl:addAlert', function (event, args)
      {
        $scope.addAlert(args)
      });

      $scope.addAlert = function (alert)
      {
        $scope.alerts.push(alert);
        $scope.resetAlertTimeout();
      };

      $scope.closeAlert = function (index)
      {
        $scope.alerts.splice(index, 1);
      };


      $scope.clearAlert = function ()
      {
        $("#alertBox").children().first("span").fadeOut('500');
        $scope.closeAlert(0);
        $scope.alertTimeout = $timeout($scope.clearAlert, 3000);
      };

      $scope.resetAlertTimeout = function ()
      {
        $timeout.cancel($scope.alertTimeout);
        $scope.alertTimeout = $timeout($scope.clearAlert, 3000);
      }


    }]);
