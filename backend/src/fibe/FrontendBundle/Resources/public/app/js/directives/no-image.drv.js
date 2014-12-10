/**
 * Directive for image replacement when image is not available
 * @see http://alex-taran.blogspot.com/2013/10/angular-js-no-image-directive.html
 * use it like :
 *
 *  <img no-image ng-src="{product.imageUrl}}" />
 *
 */
angular.module('sympozerApp').directive('noImage', ['$rootScope', function ($rootScope)
{

  var setDefaultImage = function (el)
  {
    el.attr('src', $rootScope.GLOBAL_CONFIG.app.urls.img + 'no-picture.jpg');
  };

  return {
    restrict: 'A',
    link: function (scope, el, attr)
    {
      scope.$watch(function ()
      {
        return attr.ngSrc;
      }, function ()
      {
        var src = attr.ngSrc;

        if (!src)
        {
          setDefaultImage(el);
        }
      });

      el.bind('error', function ()
      {
        setDefaultImage(el);
      });
    }
  };
}]);