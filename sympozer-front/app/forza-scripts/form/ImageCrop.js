'use strict'

angular
  .module('theme.form-image-crop', [])
  .controller('ImageCropController', ['$scope', function ($scope) {
    $scope.cropped = false;
    var imgBounds;
    $scope.setBounds = function (bounds) {
      imgBounds = bounds;
    };
    $scope.selected = function (coords) {
      $scope.imageWidth = imgBounds[0];
      $scope.containerWidth = coords.w;
      $scope.containerHeight = coords.h;
      $scope.imageTop = -coords.y;
      $scope.imageLeft = -coords.x;
      $scope.cropped = true;
    };
  }])
  .directive('croppable', ['$timeout', function ($t) {
      return {
          restrict: 'A',
          replace: true,
          scope: {
            src: '@',
            imgSelected: '&',
            cropInit: '&'
          },
          link: function (scope, element, attr) {
            var myImg;
            $t( function () {
              if (scope.src) {
                myImg = element;
                element.width(element.width()); // stupid width bug
                $(myImg).Jcrop({
                  trackDocument: true,
                  onSelect: function (x) {
                    $t(function () {
                        scope.imgSelected({ coords: x });
                    });
                  },
                  // aspectRatio: 1
                }, function () {
                    // Use the API to get the real image size 
                    scope.bounds = this.getBounds();
                });
              }
            });
            scope.$watch('bounds', function () {
              scope.cropInit({ bounds: scope.bounds });
            })
            // scope.$on('$destroy', clear);
          }
      };
  }])
