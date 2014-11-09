'use strict'

angular
  .module('theme.charts-flot', [])
  .controller('FlotChartsController', ['$scope', '$timeout', function ($scope, $timeout) {
    var sin = [], cos = [];

    for (var i = 0; i < 14; i += 0.5) {
        sin.push([i, Math.sin(i) / i]);
        cos.push([i, Math.cos(i)]);
    }

    $scope.sinusoidalData = [
      {
        data: sin,
        label: "sin(x)/x"
      }, {
        data: cos,
        label: "cos(x)"
      }
    ];

    $scope.sinusoidalOptions = {
      series: {
        shadowSize: 0,
        lines: { show: true },
        points: { show: true }
      },
      grid: { hoverable: true, clickable: true},
      yaxis: { min: -1.2, max: 1.2 },
      colors: ["#539F2E", "#3C67A5"],
      tooltip: true,
      tooltipOpts: {
        defaultTheme: true
      }
    };

    $scope.sinusoidalOnClick = function (event, position, item) {
      // console.log(event, position, item);
    };
    $scope.sinusoidalOnHover = function (event, position, item) {
      // console.log(event, position, item);
    };

    var d1 = [];
    for (var i = 0; i < 14; i += 0.5)
        d1.push([i, Math.sin(i)]);

    var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];

    var d3 = [];
    for (var i = 0; i < 14; i += 0.5)
        d3.push([i, Math.cos(i)]);

    var d4 = [];
    for (var i = 0; i < 14; i += 0.1)
        d4.push([i, Math.sqrt(i * 10)]);

    var d5 = [];
    for (var i = 0; i < 14; i += 0.5)
        d5.push([i, Math.sqrt(i)]);

    var d6 = [];
    for (var i = 0; i < 14; i += 0.5 + Math.random())
        d6.push([i, Math.sqrt(2*i + Math.sin(i) + 5)]);

    $scope.multigraphData = [
      {
        data: d1,
        lines: { show: true, fill: true },
        shadowSize: 0
      }, {
        data: d2,
        bars: { show: true },
        shadowSize: 0
      }, {
        data: d3,
        points: { show: true },
        shadowSize: 0
      }, {
        data: d4,
        lines: { show: true },
        shadowSize: 0
      }, {
        data: d5,
        lines: { show: true },
        points: { show: true },
        shadowSize: 0
      }, {
        data: d6,
        lines: { show: true, steps: true },
        shadowSize: 0
      }
    ];
    $scope.multigraphOptions = {};

    var dxta = [],
        totalPoints = 300;
    var updateInterval = 150;

    function getRandomData() {
        if (dxta.length > 0)
            dxta = dxta.slice(1);

        while (dxta.length < totalPoints) {
            var prev = dxta.length > 0 ? dxta[dxta.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;

            if (y < 0) { y = 0; }
            else if (y > 100) { y = 100; }

            dxta.push(y);
        }
        var res = [];
        for (var i = 0; i < dxta.length; ++i) {
            res.push([i, dxta[i]])
        }
        return res;
    }

    $scope.realtimeData = [getRandomData()];
    $scope.realtimeOptions = {
        series: {
            shadowSize: 0,
            lines: {
              fill: 0.1,
              lineWidth: 1.5,
              //fillColor: '#7dcc93'
            }
        },
        grid: {
          borderWidth: 0
        },
        yaxis: {
            tickColor: "rgba(0,0,0,0.04)",
            ticks: 2,
            min: 0,
            max: 100,
            font: {
                color: 'rgba(0,0,0,0.4)',
                size: 11
            },
        },
        xaxis: {
            tickColor: "transparent",
            show: false
        },
        colors: ['#7dcc93']
    };

    var promise;
    var updateRealtimeData = function () {
      $scope.realtimeData = [getRandomData()];
      $timeout.cancel(promise);
      promise = $timeout(updateRealtimeData, updateInterval);
    };

    updateRealtimeData();

    d1 = [];
    for (var i = 0; i <= 10; i += 1) d1.push([i, parseInt(Math.random() * 30)]);
    d2 = [];
    for (var i = 0; i <= 10; i += 1) d2.push([i, parseInt(Math.random() * 30)]);
    d3 = [];
    for (var i = 0; i <= 10; i += 1) d3.push([i, parseInt(Math.random() * 30)]);

    $scope.stackedIsTrue = true;
    $scope.stackedBars = true;
    $scope.stackedLines = true;
    $scope.stackedSteps = true;

    var getStackedOptions = function () {
      return {
        series: {
          stack: $scope.stackedIsTrue,
          lines: {
            show: $scope.stackedLines,
            fill: true,
            steps: $scope.stackedSteps
          },
          bars: {
            show: $scope.stackedBars,
            barWidth: 0.6
          }
        }
      };
    };

    $scope.toggleOption = function (type) {
      $scope['stacked'+type] = !$scope['stacked'+type];
      $scope.stackedOptions = getStackedOptions();
    };
    $scope.stackedOptions = getStackedOptions();
    $scope.stackedData = [d1, d2, d3];

    $scope.pieData = [
        { label: "Series1",  data: 10},
        { label: "Series2",  data: 30},
        { label: "Series3",  data: 90},
        { label: "Series4",  data: 70},
        { label: "Series5",  data: 80},
        { label: "Series6",  data: 110}
    ];

    $scope.$on('$destroy', function () {
      $timeout.cancel(promise);
    })
  }])
  .directive('flotChart', function () {
    return {
      restrict: 'AE',
      scope: {
        data: '=flotData',
        options: '=flotOptions',
        plothover: '&plotHover',
        plotclick: '&plotClick'
      },
      link: function (scope, element, attr) {
        var plot = $.plot($(element), scope.data, scope.options);

        $(element).bind('plothover', function (event, position, item) {
          scope.plothover( {
            event: event,
            position: position, 
            item: item
          });
        });

        $(element).bind('plotclick', function (event, position, item) {
          scope.plotclick( {
            event: event,
            position: position, 
            item: item
          });
        });

        scope.$watch('data', function (newVal, oldVal) {
          plot.setData(newVal);
          plot.draw();
        });

        scope.$watch('options', function (newVal, oldVal) {
          plot = $.plot($(element), scope.data, newVal);
        }, true);
      }
    }
  })
