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

    //set default src img attribute for an img element that doesn't has a src attribute
    var setDefaultImage = function (el)
    {
        el.attr('src', $rootScope.GLOBAL_CONFIG.app.urls.img + 'no-picture.jpg');
    };

    return {
        restrict: 'A',
        link: function (scope, el, attr)
        {
            //Observe ngSrc attribute
            scope.$watch(function ()
            {
                return attr.ngSrc;
            }, function ()
            {

                var src = attr.ngSrc;

                //if src not define, set default image
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