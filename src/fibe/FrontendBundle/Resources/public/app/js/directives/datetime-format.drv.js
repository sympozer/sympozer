/**
 * TODO : doc
 */
angular.module('sympozerApp').directive('datetimeFormat',
  ['$parse', function ($parse)
  {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, element, attrs, ngModel) {

              var serverFormat = "YYYY-MM-DDTHH:mm:ssZ";
              var displayFormat = attrs.datetimeFormat || "LLLL";

              // This returns a function that returns the result of your ng-model expression.
              var modelGetter = $parse(attrs['ngModel']);

              ngModel.$formatters.push(formatter);
              ngModel.$parsers.push(parser);

              scope.$watch(attrs.ngModel, function(newValue, oldValue, scope) {
                  if(newValue && newValue != oldValue)
                  {
                      // This returns a function that lets us set the value of the ng-model binding expression
                      var modelSetter = modelGetter.assign;

                      // This is how you can use it to set the value 'bar' on the given scope.
                      modelSetter(scope, formatter(ngModel.$modelValue, serverFormat));
                  }
              });

              element.on('change', function (e) {
                  var element = e.target
                  element.value = formatter(ngModel.$modelValue);
              });

              function parser(value) {
                  var m = moment(value);
                  var valid = m.isValid();
                  ngModel.$setValidity('datetime', valid);
                  if (valid) return m.valueOf();
                  else return value;
              }

              function formatter(value, format) {
                  if (!value) return value;
                  return moment(value).format(format || displayFormat);
              }
          }
      }
  }]);