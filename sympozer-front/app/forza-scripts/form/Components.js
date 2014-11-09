'use strict'

angular
  .module('theme.form-components', [])
  .controller('FormComponentsController', ['$scope', '$http', function ($scope, $http) {
    $scope.switchStatus = 1;
    $scope.switchStatus2 = 1;
    $scope.switchStatus3 = 1;
    $scope.switchStatus4 = 1;
    $scope.switchStatus5 = 1;
    $scope.switchStatus6 = 1;

    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };

    $scope.colorPicked = '#fa4d4d';

    $scope.select2RemoteOptions = {
        placeholder: "Search for a movie",
        minimumInputLength: 3,
        width: 'resolve',
        ajax: {
            url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
            dataType: 'jsonp',
            quietMillis: 100,
            data: function (term, page) { // page is the one-based page number tracked by Select2
                return {
                    q: term, //search term
                    page_limit: 10, // page size
                    page: page, // page number
                    apikey: "8vzys3eka2s9hpvkh7wwzp7e" // please do not use so this example keeps working
                };
            },
            results: function (data, page) {
                var more = (page * 10) < data.total; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return {results: data.movies, more: more};
            }
        },
        formatResult: function (movie) {
            var markup = "<table class='movie-result'><tr>";
            if (movie.posters !== undefined && movie.posters.thumbnail !== undefined) {
                markup += "<td class='movie-image'><img src='" + movie.posters.thumbnail + "'/></td>";
            }
            markup += "<td class='movie-info'><div class='movie-title'>" + movie.title + "</div>";
            if (movie.critics_consensus !== undefined) {
                markup += "<div class='movie-synopsis'>" + movie.critics_consensus + "</div>";
            }
            else if (movie.synopsis !== undefined) {
                markup += "<div class='movie-synopsis'>" + movie.synopsis + "</div>";
            }
            markup += "</td></tr></table>"
            return markup;
        },
        formatSelection: function (movie) { return movie.title; },
        dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    };

    $scope.tagList = ['tag1', 'tag2']
    $scope.select2TaggingOptions = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4'] // Can be empty list.
    };

    $scope.multiSelect1 = [];
    $scope.multiSelect2 = [];
  }])
  .controller('DatepickerDemoController', ['$scope', function ($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }])
  .controller('TimepickerDemoCtrl', ['$scope', function ($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }])
  .controller('DateRangePickerDemo', ['$scope', function ($scope) {
    $scope.drp_start = moment().subtract('days', 1).format('MMMM D, YYYY');
    $scope.drp_end = moment().add('days', 31).format('MMMM D, YYYY');
    $scope.drp_options = {
      ranges: {
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
         'Last 7 Days': [moment().subtract('days', 6), moment()],
         'Last 30 Days': [moment().subtract('days', 29), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
      },
      opens: 'left',
      startDate: moment().subtract('days', 29),
      endDate: moment()
    };
  }])
