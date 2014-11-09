'use strict'

angular
  .module('theme.charts-inline', [])
  .directive('sparklines', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        options: '=sparklines',
        values: '=data'
      },
      link: function (scope, element, attr) {
        var options = {};
        if (scope.options) {
          var options = angular.copy (scope.options);
        }
        var container = $(element).closest('sparklines-composite');
        var target = element;
        if (container.length) {
          if (container.find('span.sparklines-container').length < 1) {
            container.append('<span class="sparklines-container"></span>');
          }
          target = container.find('span.sparklines-container');
          if (target.find('canvas').length) {
            options.composite = true;
          }
          if (attr.values)
            target.attr('values', attr.values);
          else
            target.removeAttr('values');
        }

        // since the canvas will be invisible if the parent element is :\
        scope.$watch( function () { return element.is(':visible'); }, function () {
          if (scope.values) {
            $(target).sparkline(scope.values, options);
          } else {
            $(target).sparkline('html', options);
          }
        })
      }
    }
  }])
