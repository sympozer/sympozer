'use strict'

angular
  .module('theme.colorpicker-controller', [])
  .controller('ColorPickerController', ['$scope', '$global', function ($scope, $global) {
    $scope.headerStylesheet = 'header-midnightblue.css';
    $scope.sidebarStylesheet = 'sidebar-gray.css';
    $scope.headerBarHidden = $global.get('headerBarHidden');
    $scope.layoutFixed = $global.get('layoutBoxed');
    $scope.headerFixed = $global.get('fixedHeader');
    $scope.layoutHorizontal = $global.get('layoutHorizontal');

    $scope.setHeaderStyle = function (filename, $event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.headerStylesheet = filename;
    };

    $scope.setSidebarStyle = function (filename, $event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.sidebarStylesheet = filename;
    };

    $scope.$watch('headerFixed', function (newVal) {
      if (newVal === undefined) return;
      $global.set('fixedHeader', newVal);
    });
    $scope.$watch('layoutFixed', function (newVal) {
      $global.set('layoutBoxed', newVal);
    });
    $scope.$watch('layoutHorizontal', function (newVal) {
      $global.set('layoutHorizontal', newVal);
    });

    $scope.$on('globalStyles:changed:layoutBoxed', function (event, newVal) {
      $scope.layoutFixed = newVal;
    });
    $scope.$on('globalStyles:changed:layoutHorizontal', function (event, newVal) {
      $scope.layoutHorizontal = newVal;
    });
  }])
