'use strict'

angular
  .module('theme.charts-canvas', [])
  .controller('CanvasChartsController', ['$scope', function ($scope) {
    $scope.lineChartData = {
      labels : ["January","February","March","April","May","June","July"],
      datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : [65,59,90,81,56,55,40]
        }, {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : [28,48,40,19,96,27,100]
        }
      ]
    };

    $scope.barChartData = {
      labels : ["January","February","March","April","May","June","July"],
      datasets : [
        {
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          data : [65,59,90,81,56,55,40]
        }, {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          data : [28,48,40,19,96,27,100]
        }
      ]
    };

    $scope.radarChartData = {
      labels : ["Eating","Drinking","Sleeping","Designing","Coding","Partying","Running"],
      datasets : [
        {
          fillColor : "rgba(220,220,220,0.5)",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          data : [65,59,90,81,56,55,40]
        }, {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          data : [28,48,40,19,96,27,100]
        }
      ]
    }

    $scope.pieData = [{
        value: 30,
        color:"#F38630"
      }, {
        value : 50,
        color : "#E0E4CC"
      }, {
        value : 100,
        color : "#69D2E7"
    }];

    $scope.polarAreaData = [
        {
            value : Math.random(),
            color: "#D97041"
        },
        {
            value : Math.random(),
            color: "#C7604C"
        },
        {
            value : Math.random(),
            color: "#21323D"
        },
        {
            value : Math.random(),
            color: "#9D9B7F"
        },
        {
            value : Math.random(),
            color: "#7D4F6D"
        },
        {
            value : Math.random(),
            color: "#584A5E"
        }
    ];

    $scope.doughnutData = [
        {
            value: 30,
            color:"#F7464A"
        },
        {
            value : 50,
            color : "#46BFBD"
        },
        {
            value : 100,
            color : "#FDB45C"
        },
        {
            value : 40,
            color : "#949FB1"
        },
        {
            value : 120,
            color : "#4D5360"
        }
    ];
  }])
  .directive('canvasChart', function () {
    return {
      restrict: 'EA',
      scope: {
        data: '=canvasChart',
        options: '=options',
        type: '=',
      },
      link: function (scope, element, attr) {
        if (Chart) {
          // console.log(element[0].getContext);
          (new Chart($(element)[0].getContext('2d')))[scope.type](scope.data, scope.options);
        }
      }
    }
  })
