'use strict'

angular
  .module('theme.ui-carousel', [])
  .controller('CarouselDemoController', ['$scope', function ($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    var images = ['yvonne.jpg', 'nature_woodstump.jpg', 'arch_fireescape.jpg', 'nature_river.jpg'];
    $scope.addSlide = function() {
      slides.push({
        image: 'assets/demo/images/'+images[slides.length],
        text: images[slides.length]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
