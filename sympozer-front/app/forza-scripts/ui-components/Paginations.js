'use strict'

angular
  .module('theme.ui-paginations', [])
  .controller('PaginationAndPagingController', ['$scope', function ($scope) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.dpWithCallback = {
      onSelectedDateChanged: function(event, date) {
        alert("Selected date: " + moment(date).format("Do, MMM YYYY"));
      }
    };
  }])
  .directive('datepaginator', function () {
    return {
      restrict: 'A',
      scope: {
        options: '=datepaginator'
      },
      link: function (scope, element, attr) {
        setTimeout( function () {
          element.datepaginator(scope.options);
        }, 10);
      }
    };
  })
