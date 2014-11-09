'use strict'

angular
  .module('theme.layout-horizontal', [])
  .controller('HorizontalPageController', ['$scope', '$global', function ($scope, $global) {
    var isHorizontal = $global.get('layoutHorizontal');
    $global.set('layoutHorizontal', true);

    $scope.$on('$destroy', function () {
      if (!isHorizontal)
        $global.set('layoutHorizontal', false);
    });
  }])
  .controller('HorizontalPage2Controller', ['$scope', '$global', function ($scope, $global) {
    var isHorizontal = $global.get('layoutHorizontal');
    var isLargeIcons = $global.get('layoutHorizontalLargeIcons');
    $global.set('layoutHorizontal', true);
    $global.set('layoutHorizontalLargeIcons', true);

    $scope.$on('$destroy', function () {
      if (!isHorizontal)
        $global.set('layoutHorizontal', false);
      if (!isLargeIcons)
        $global.set('layoutHorizontalLargeIcons', false);
    });
  }])
