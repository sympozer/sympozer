'use strict'

angular
  .module('theme.form-directives', [])
  .directive('autosize', function () {
    return {
      restrict: 'AC',
      link: function (scope, element, attr) {
        element.autosize({append: "\n"})
      }
    }
  })
  .directive('fullscreen', function () {
    return {
      restrict: 'AC',
      link: function (scope, element, attr) {
        element.fseditor({maxHeight: 500});
      }
    }
  })
  .directive('colorpicker', function () {
    return {
      restrict: 'AC',
      link: function (scope, element, attr) {
        element.colorpicker();
      }
    }
  })
  .directive('daterangepicker', function () {
    return {
      restrict: 'A',
      scope: {
        options: '=daterangepicker',
        start: '=dateBegin',
        end: '=dateEnd'
      },
      link: function (scope, element, attr) {
        element.daterangepicker(scope.options, function (start, end) {
          if (scope.start) scope.start = start.format('MMMM D, YYYY');
          if (scope.end) scope.end = end.format('MMMM D, YYYY');
          scope.$apply();
        });
      }
    }
  })
  .directive('multiselect', ['$timeout', function ($t) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        $t( function () {
          element.multiSelect();
        });
      }
    }
  }])
  .directive('wizard', function () {
    return {
      restrict: 'A',
      scope: {
        options: '=wizard'
      },
      link: function (scope, element, attr) {
          if (scope.options) {        
            element.stepy(scope.options);

            //Make Validation Compability - see docs
            if (scope.options.validate == true)
              element.validate({
                  errorClass: "help-block",
                  validClass: "help-block",
                  highlight: function(element, errorClass,validClass) {
                     $(element).closest('.form-group').addClass("has-error");
                  },
                  unhighlight: function(element, errorClass,validClass) {
                      $(element).closest('.form-group').removeClass("has-error");
                  }
               });
          } else {
            element.stepy();
          }
          //Add Wizard Compability - see docs
          element.find('.stepy-navigator').wrapInner('<div class="pull-right"></div>');
      }
    }
  })
  .directive('maskinput', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        element.inputmask();
      }
    }
  })
  .directive('wysiwygCkeditor', function () {
    return {
      restrict: 'A',
      scope: {
        options: '=wysiwygCkeditor'
      },
      link: function (scope, element, attr) {
        if (scope.options && scope.options.inline == true)
          return CKEDITOR.inline(attr.name || attr.id, scope.options);

        CKEDITOR.replace(attr.name || attr.id, scope.options);
      }
    }
  })
