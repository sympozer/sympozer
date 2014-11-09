'use strict'

angular
  .module('theme.ui-ratings', [])
  .controller('RatingsDemoController', ['$scope', function ($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      this.overStar = value;
      this.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'fa-check-circle', stateOff: 'fa-check-circle-o'},
      {stateOn: 'fa-star', stateOff: 'fa-star-o'},
      {stateOn: 'fa-heart', stateOff: 'fa-heart-o'},
      {stateOn: 'fa-heart'},
      {stateOff: 'fa-heart-o'}
    ];
  }])
 
