'use strict'

angular
  .module('theme.layout-boxed', [])
  .controller('BoxedPageController', ['$scope', '$global', function ($scope, $global) {
    $global.set('layoutBoxed', true);

    $scope.$on('$destroy', function () {
      $global.set('layoutBoxed', false);
    });
  }])
