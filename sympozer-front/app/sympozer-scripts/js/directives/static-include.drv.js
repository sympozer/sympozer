/**
 * own include directive that does not create a new scope
 * use it like :
 * <div class="row" static-include="GLOBAL_CONFIG.app.modules.teammates.urls.partials+'person-entity-list.html'"></div>
 *
 */
angular.module('sympozerApp').directive('staticInclude', ['$http', '$templateCache', '$compile', function ($http, $templateCache, $compile)
{
    return  {
        restrict: 'EA',
        link    : function (scope, element, attrs)
        {
            var templatePath = attrs.staticInclude;
            $http.get(templatePath, { cache: $templateCache }).success(function (response)
            {
                var contents = element.html(response).contents();
                $compile(contents)(scope);
            });
        }
    }
}]);