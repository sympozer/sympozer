'use strict'

angular
  .module('theme.directives', [])
//  .directive('disableAnimation', ['$animate', function ($animate)
//  {
//    return {
//      restrict: 'A',
//      link: function ($scope, $element, $attrs)
//      {
//        $attrs.$observe('disableAnimation', function (value)
//        {
//          $animate.enabled(!value, $element);
//        });
//      }
//    }
//  }])
//  .directive('slideOut', function ()
//  {
//    return {
//      restrict: 'A',
//      scope: {
//        show: '=slideOut'
//      },
//      link: function (scope, element, attr)
//      {
//        element.hide();
//        scope.$watch('show', function (newVal, oldVal)
//        {
//          if (newVal !== oldVal)
//          {
//            element.slideToggle({
//              complete: function ()
//              {
//                scope.$apply();
//              }
//            });
//          }
//        });
//      }
//    }
//  })



  .directive('prettyprint', function ()
  {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs)
      {
        element.html(prettyPrintOne(element.html(), '', true));
      }
    };
  })
  .directive("passwordVerify", function ()
  {
    return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function (scope, element, attrs, ctrl)
      {
        scope.$watch(function ()
        {
          var combined;

          if (scope.passwordVerify || ctrl.$viewValue)
          {
            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
          }
          return combined;
        }, function (value)
        {
          if (value)
          {
            ctrl.$parsers.unshift(function (viewValue)
            {
              var origin = scope.passwordVerify;
              if (origin !== viewValue)
              {
                ctrl.$setValidity("passwordVerify", false);
                return undefined;
              }
              else
              {
                ctrl.$setValidity("passwordVerify", true);
                return viewValue;
              }
            });
          }
        });
      }
    };
  })
  .directive('backgroundSwitcher', function ()
  {
    return {
      restrict: 'EA',
      link: function (scope, element, attr)
      {
        $(element).click(function ()
        {
          $('body').css('background', $(element).css('background'));
        });
      }
    };
  })


  .directive('knob', function ()
  {
    return {
      restrict: 'EA',
      template: '<input class="dial" type="text"/>',
      scope: {
        options: '='
      },
      replace: true,
      link: function (scope, element, attr)
      {
        $(element).knob(scope.options);
      }
    }
  })
  .directive('uiBsSlider', ['$timeout', function ($timeout)
  {
    return {
      link: function (scope, element, attr)
      {
        // $timeout is needed because certain wrapper directives don't
        // allow for a correct calculaiton of width
        $timeout(function ()
        {
          element.slider();
        });
      }
    };
  }])

  // specific to app
  .directive('stickyScroll', function ()
  {
    return {
      restrict: 'A',
      link: function (scope, element, attr)
      {
        function stickyTop()
        {
          var topMax = parseInt(attr.stickyScroll);
          var headerHeight = $('header').height();
          if (headerHeight > topMax)
          {
            topMax = headerHeight;
          }
          if ($('body').hasClass('static-header') == false)
          {
            return element.css('top', topMax + 'px');
          }
          var window_top = $(window).scrollTop();
          var div_top = element.offset().top;
          if (window_top < topMax)
          {
            element.css('top', (topMax - window_top) + 'px');
          }
          else
          {
            element.css('top', 0 + 'px');
          }
        }

        $(function ()
        {
          $(window).scroll(stickyTop);
          stickyTop();
        });
      }
    }
  })
  .directive('rightbarRightPosition', function ()
  {
    return {
      restrict: 'A',
      scope: {
        isFixedLayout: '=rightbarRightPosition'
      },
      link: function (scope, element, attr)
      {
        scope.$watch('isFixedLayout', function (newVal, oldVal)
        {
          if (newVal != oldVal)
          {
            setTimeout(function ()
            {
              var $pc = $('#page-content');
              var ending_right = ($(window).width() - ($pc.offset().left + $pc.outerWidth()));
              if (ending_right < 0)
              {
                ending_right = 0;
              }
              $('#page-rightbar').css('right', ending_right);
            }, 100);
          }
        });
      }
    };
  })
  .directive('fitHeight', ['$window', '$timeout', '$location', function ($window, $timeout, $location)
  {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attr)
      {
        scope.docHeight = $(document).height();
        var setHeight = function (newVal)
        {
          var diff = $('header').height();
          if ($('body').hasClass('layout-horizontal'))
          {
            diff += 112;
          }
          if ((newVal - diff) > element.outerHeight())
          {
            element.css('min-height', (newVal - diff) + 'px');
          }
          else
          {
            element.css('min-height', $(window).height() - diff);
          }
        };
        scope.$watch('docHeight', function (newVal, oldVal)
        {
          setHeight(newVal);
        });
        $(window).on('resize', function ()
        {
          setHeight($(document).height());
        });
        var resetHeight = function ()
        {
          scope.docHeight = $(document).height();
          $timeout(resetHeight, 1000);
        }
        $timeout(resetHeight, 1000);
      }
    };
  }])
//  .directive('jscrollpaneOn', ['$timeout', function ($timeout)
//  {
//    return {
//      restrict: 'A',
//      scope: {
//        applyon: '=jscrollpaneOn'
//      },
//      link: function (scope, element, attr)
//      {
//        scope.$watch('applyon', function (newVal)
//        {
//          if (newVal == false)
//          {
//            var api = element.data('jsp');
//            if (api)
//            {
//              api.destroy();
//            }
//            return;
//          }
//          $timeout(function ()
//          {
//            element.jScrollPane({autoReinitialise: true});
//          });
//        });
//      }
//    };
//  }])
  .directive('backToTop', function ()
  {
    return {
      restrict: 'AE',
      link: function (scope, element, attr)
      {
        element.click(function (e)
        {
          $('body').scrollTop(0);
        });
      }
    }
  })

