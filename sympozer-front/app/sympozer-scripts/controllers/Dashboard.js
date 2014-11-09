'use strict'

angular.module('theme.dashboard',  [])
  .controller('DashboardController', ['$scope', function ($scope) {
    $scope.percentages = [53, 65, 23, 99];
    $scope.randomizePie = function() {
      $scope.percentages = _.shuffle($scope.percentages);
    };

    function randValue() {
        return (Math.floor(Math.random() * (2)));
    }

    var slOpts = function(a,b) { return {data: a, opts: b}; };

    $scope.plotStatsData = [{
        data: [
            [1, 1100],
            [2, 1400],
            [3, 1200],
            [4, 800],
            [5, 600],
            [6, 800],
            [7, 700],
            [8, 900],
            [9, 1700],
            [10, 1200],
            // [11, 400],
            // [12, 700],
            // [13, 600],
            // [14, 800],
            // [15, 600],
            // [16, 400],
            // [17, 500],
            // [18, 900],
            // [19, 800],
            // [20, 1000],
            // [21, 800],
            // [22, 1400],
            // [23, 1700],
            // [24, 1500],
            // [25, 1600],
            // [26, 1300],
            // [27, 1700],
            // [28, 1200],
            // [29, 1300],
            // [30, 1200]
        ],
        label: 'View Count'
    }];

    $scope.plotStatsOptions =  {
        series: {
            lines: {
                show: true,
                lineWidth: 1.5,
                fill: 0.1
            },
            points: {
                show: true
            },
            shadowSize: 0
        },
        grid: {
            labelMargin: 10,
            hoverable: true,
            clickable: true,
            borderWidth: 0
        },
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false,
          content: "View Count: %y"
        },
        colors: ["#b3bcc7"],
        xaxis: {
            tickColor: 'transparent',
            
            tickDecimals: 0,
            autoscaleMargin: 0,
            font: {
                color: 'rgba(0,0,0,0.4)',
                size: 11
            }
        },
        yaxis: {
            ticks: 4,
            tickDecimals: 0,
            tickColor: "rgba(0,0,0,0.04)",
            font: {
                color: 'rgba(0,0,0,0.4)',
                size: 11
            },
            tickFormatter: function (val, axis) {
                if (val>999) {return (val/1000) + "K";} else {return val;}
            }
        },
        legend : {
            labelBoxBorderColor: 'transparent'
        }
    };

    var slOpts = function(a,b) { return {data: a, opts: b}; };

    $scope.plotRevenueData = [{
        data: [
            [1, 1100],
            [2, 1400],
            [3, 1200],
            [4, 800],
            [5, 600],
            [6, 800],
            [7, 700],
            [8, 900],
            [9, 700],
            [10, 300]
        ],
        label: 'Revenues'
    }];

    $scope.plotRevenueOptions =  {
        series: {

            // lines: {
            //     show: true,
            //     lineWidth: 1.5,
            //     fill: 0.1
            // },
            bars: {
              show:true,
              fill: 1,
              lineWidth: 0,
              barWidth: 0.6,
              align: 'center'
            },
            points: {
                show: false
            },
            shadowSize: 0
        },
        grid: {
            labelMargin: 10,
            hoverable: true,
            clickable: true,
            borderWidth: 0
        },
        tooltip: true,
        tooltipOpts: {
          defaultTheme: false,
          content: "Revenue: %y"
        },
        colors: ["#b3bcc7"],
        xaxis: {
            tickColor: 'transparent',
            //min: -0.5,
            //max: 2.7,
            tickDecimals: 0,
            autoscaleMargin: 0,
            font: {
                color: 'rgba(0,0,0,0.4)',
                size: 11
            }
        },
        yaxis: {
            ticks: 4,
            tickDecimals: 0,
            tickColor: "rgba(0,0,0,0.04)",
            font: {
                color: 'rgba(0,0,0,0.4)',
                size: 11
            },
            tickFormatter: function (val, axis) {
                if (val>999) {return "$" + (val/1000) + "K";} else {return "$" + val;}
            }
        },
        legend : {
            labelBoxBorderColor: 'transparent'
        }
    };

    $scope.currentPage = 1;
    $scope.itemsPerPage = 7;

    $scope.accountsInRange = function () {
        return this.userAccounts.slice(this.currentPage*7, this.currentPage*7+7);
    };

    $scope.uaHandle = function ($index) {
        // console.log(ua);
        this.userAccounts.splice($index, 1);
    };

    $scope.uaHandleSelected = function () {
        this.userAccounts = _.filter(this.userAccounts, function (item) {
            return (item.rem == false || item.rem == undefined);
        });
    };

    var avatars = ['potter.png', 'tennant.png', 'johansson.png', 'jackson.png', 'jobs.png'];
    $scope.userAccounts = [
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Foreman Bullock",
        "email": "foremanbullock@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Alberta Ochoa",
        "email": "albertaochoa@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Terry Hahn",
        "email": "terryhahn@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Donovan Doyle",
        "email": "donovandoyle@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Stacie Blankenship",
        "email": "stacieblankenship@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Julie Nunez",
        "email": "julienunez@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Lacey Farrell",
        "email": "laceyfarrell@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Stacy Cooke",
        "email": "stacycooke@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Teri Frost",
        "email": "terifrost@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Dionne Payne",
        "email": "dionnepayne@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Kaufman Garrison",
        "email": "kaufmangarrison@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Curry Avery",
        "email": "curryavery@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Carr Sharp",
        "email": "carrsharp@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Cooper Scott",
        "email": "cooperscott@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Juana Spencer",
        "email": "juanaspencer@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Madelyn Marks",
        "email": "madelynmarks@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Bridget Ray",
        "email": "bridgetray@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Santos Christensen",
        "email": "santoschristensen@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Geneva Rivers",
        "email": "genevarivers@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Carmella Bond",
        "email": "carmellabond@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Duke Munoz",
        "email": "dukemunoz@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Ramos Rasmussen",
        "email": "ramosrasmussen@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Maricela Sweeney",
        "email": "maricelasweeney@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Carmen Riley",
        "email": "carmenriley@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Whitfield Hartman",
        "email": "whitfieldhartman@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Jasmine Keith",
        "email": "jasminekeith@geemail.com"
      },
      {
        "picture": _.shuffle(avatars).shift(),
        "name": "Baker Juarez",
        "email": "bakerjuarez@geemail.com"
      }
    ];
  }])