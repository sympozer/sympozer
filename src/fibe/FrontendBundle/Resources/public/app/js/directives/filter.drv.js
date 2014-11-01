/**
 * angular directive used to add a filter in a *ListCtrl page
 * must be used in a controller with a scope variable "filters"
 *
 * use it like :
 * <a href="javascript:void(0)" filter="roleLabel" ng-click="addFilter(roleLabel.label)">
 *
 * controller var (from the responsible controller) :
 *      @param filters : an object of filter
 *
 * directive param :
 *    @param key      : the key to filter by
 *    @param value    : the filter value
 */
angular.module('sympozerApp').directive('filter',
  ['GLOBAL_CONFIG', '$injector', 'searchService', function (GLOBAL_CONFIG, $injector, searchService)
  {
    return {
      restrict: 'A',
      link: function (scope, element, attrs)
      {
        var scopeOfFilters = scope.filters ? scope : scope.$parent;

        if (!scopeOfFilters.filters)
        {
          scopeOfFilters.filters = [];
        }

        scope.addFilter = function (value)
        {

          scopeOfFilters.initialize();
          if (!scopeOfFilters.filters[attrs.filter])
          {
            scopeOfFilters.filters[attrs.filter] = [];
          }
          var valueIdx = scopeOfFilters.filters[attrs.filter].indexOf(value)
          if (valueIdx != -1)
          {
            scopeOfFilters.filters[attrs.filter].splice(valueIdx, 1);
          }
          else
          {
            scopeOfFilters.filters[attrs.filter].push(value);
          }

          scopeOfFilters.load(true);
        };
      }
    };
  }]);