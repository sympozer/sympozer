'use strict'

angular
  .module('theme.ui-sliders', [])
  .controller('RangeAndSliderController', ['$scope', 'progressLoader', function ($scope, progressLoader) {
    $scope.percent = 43;
    $scope.percentages = [53, 65, 23, 99];
    $scope.randomizePie = function() {
      $scope.percentages = _.shuffle($scope.percentages);
    };

    $scope.loaderStart = function () {
      progressLoader.start();
      setTimeout(function(){
          progressLoader.set(50);
      }, 1000);

      setTimeout(function(){
          progressLoader.end();
      }, 1500);
    };
    $scope.loaderEnd = function () {
      progressLoader.end();
    };
    $scope.loaderSet = function (position) {
      progressLoader.set(position);
    };
    $scope.loaderGet = function () {
      alert(progressLoader.get()+'%');
    };
    $scope.loaderInch = function (amount) {
      progressLoader.inch(10);
    };
  }])
