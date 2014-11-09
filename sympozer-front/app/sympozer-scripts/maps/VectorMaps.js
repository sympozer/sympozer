'use strict'

angular.module('theme.vector_maps', [])
  .controller('VectorMapsController', ['$scope', function ($scope) {
      $scope.jqvmapWorld = {
          map: 'world_en',
          backgroundColor: 'transparent',
          color: '#f5f5f5',
          hoverOpacity: 0.7,
          selectedColor: '#1880c4',
          enableZoom: true,
          showTooltip: true,
          values: sample_data,
          scaleColors: ['#90c2e3', '#4697ce'],
          normalizeFunction: 'polynomial'
      };

      $scope.jqvmapUSA = {
          map: 'usa_en',
          backgroundColor: 'transparent',
          color: '#509BBD',
          hoverOpacity: 0.7,
          selectedColor: '#1278a6',
          enableZoom: true,
          showTooltip: true,
          values: sample_data,
          scaleColors: ['#C8EEFF', '#006491'],
          normalizeFunction: 'polynomial'
      };

      $scope.jqvmapEurope = {
          map: 'europe_en',
          backgroundColor: 'transparent',
          color: '#dddddd',
          hoverOpacity: 0.7,
          selectedColor: '#1dda1d',
          enableZoom: true,
          showTooltip: true,
          values: sample_data,
          scaleColors: ['#b6ddb7', '#51d951'],
          normalizeFunction: 'polynomial'
      };
  }])
  .directive('jqvmap', ['$timeout', function ($timeout) {
  	return {
  		restrict: 'A',
  		scope: {
  			options: '=',
  		},
  		link: function (scope, element, attr) {
  			$timeout( function () {
          element.vectorMap(scope.options);
          scope.$on('$destroy', function () {
            element.data().mapObject.applyTransform = function() {}; // prevent acting on nonexistent object
          });
        });
  		}
  	}
  }])