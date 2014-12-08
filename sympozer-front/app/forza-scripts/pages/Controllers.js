'use strict'

angular
  .module('theme.pages-controllers', [])
  .controller('SignupPageController', ['$scope', '$global', function ($scope, $global)
  {
    $global.set('fullscreen', true);

    $scope.$on('$destroy', function ()
    {
      $global.set('fullscreen', false);
    });
  }])
  .controller('RegistrationPageController', ['$scope', '$timeout', function ($scope, $timeout)
  {
    $scope.checking = false;
    $scope.checked = false;
    $scope.checkAvailability = function ()
    {
      if ($scope.reg_form.username.$dirty == false)
      {
        return;
      }
      $scope.checking = true;
      $timeout(function ()
      {
        $scope.checking = false;
        $scope.checked = true;
      }, 500);
    };
  }]).directive('scrollToBottom', function ()
  {
    return {
      restrict: 'A',
      scope: {
        model: '=scrollToBottom'
      },
      link: function (scope, element, attr)
      {
        scope.$watch('model', function (n, o)
        {
          if (n != o)
          {
            element[0].scrollTop = element[0].scrollHeight;
          }
        });
      }
    };
  })