'use strict'

angular
  .module('theme.form-directives', [])
  .directive('multiselect', ['$timeout', function ($t)
  {
    return {
      restrict: 'A',
      link: function (scope, element, attr)
      {
        $t(function ()
        {
          element.multiSelect();
        });
      }
    }
  }])
  .directive('wizard', function ()
  {
    return {
      restrict: 'A',
      scope: {
        options: '=wizard'
      },
      link: function (scope, element, attr)
      {
        if (scope.options)
        {
          element.stepy(scope.options);

          //Make Validation Compability - see docs
          if (scope.options.validate == true)
          {
            element.validate({
              errorClass: "help-block",
              validClass: "help-block",
              highlight: function (element, errorClass, validClass)
              {
                $(element).closest('.form-group').addClass("has-error");
              },
              unhighlight: function (element, errorClass, validClass)
              {
                $(element).closest('.form-group').removeClass("has-error");
              }
            });
          }
        }
        else
        {
          element.stepy();
        }
        //Add Wizard Compability - see docs
        element.find('.stepy-navigator').wrapInner('<div class="pull-right"></div>');
      }
    }
  })
  .directive('maskinput', function ()
  {
    return {
      restrict: 'A',
      link: function (scope, element, attr)
      {
        element.inputmask();
      }
    }
  })
  .directive('wysiwygCkeditor', function ()
  {
    return {
      restrict: 'A',
      scope: {
        options: '=wysiwygCkeditor'
      },
      link: function (scope, element, attr)
      {
        if (scope.options && scope.options.inline == true)
        {
          return CKEDITOR.inline(attr.name || attr.id, scope.options);
        }

        CKEDITOR.replace(attr.name || attr.id, scope.options);
      }
    }
  })
