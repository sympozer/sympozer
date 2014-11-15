/**
 * Safe html filter
 * Manage escaping value with SCE built-in angular service : Strict Contextual Escaping (SCE) is a mode in which AngularJS requires bindings in certain contexts to result in a value that is marked as safe to use for that context
 * @type {filter}
 */
angular.module('sympozerApp').filter('safe_html', ['$sce', function ($sce)
{
    return function (val)
    {
        return $sce.trustAsHtml(val);
    };
}])