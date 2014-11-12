/**
 * Do not reload the current template if not needed.
 *
 * See AngularJS: Change hash and route without completely reloading controller http://stackoverflow.com/questions/12115259/angularjs-change-hash-and-route-without-completely-reloading-controller
 *
 * use it like :
 *
 * .controller('MyCtrl',
 * ['$scope', 'DoNotReloadCurrentTemplate', function($scope, DoNotReloadCurrentTemplate) {
 *    DoNotReloadCurrentTemplate($scope);
 * }]);
 **/
angular.module('sympozerApp').factory('DoNotReloadCurrentTemplate', [
  '$route', function ($route)
  {
    return function (scope)
    {
      var lastRoute = $route.current;
      scope.$on('$locationChangeSuccess', function ()
      {
        if (lastRoute.$$route.templateUrl === $route.current.$$route.templateUrl)
        {
          console.log('DoNotReloadCurrentTemplate not reloading template: ' + $route.current.$$route.templateUrl);
          $route.current = lastRoute;
        }
      });
    };
  }]);
