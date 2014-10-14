/**
 * Category controllers
 */

/**
 * Main category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesMainCtrl', [function ($scope)
{

}]);

/**
 * List category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'categoriesFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, categoriesFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;


    $scope.entities = [];

    var baseFilters;
    if ($routeParams.mainEventId)
    {
        $scope.filters = baseFilters = {
            mainEventId: $routeParams.mainEventId
        };
    }

    $scope.reload = function ()
    {
        // $scope.categories = category.list();
        $scope.entities.$promise.then(function ()
        {
            console.log('From cache:', $scope.entities);
        });
        //console.log($scope.categories);
    };

    $scope.clone = function (category)
    {
        var clonecategory = angular.copy(category);
        delete clonecategory.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'category saved', type: 'success'});
            $scope.entities.push(response);
        };

        clonecategory.$create({}, success, error);
    };


    $scope.deleteModal = function (index, category)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.categories.urls.partials + 'categories-delete.html', {
            id: 'complexDialog',
            title: 'category deletion',
            backdrop: true,
            controller: 'categoriesDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                categoriesFact.delete({id: category.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            categoryModel: category
        });
    }
}]);


angular.module('categoriesApp').controller('categoriesNewCtrl', [ '$scope', '$window', '$routeParams', '$rootScope', '$location', 'categoriesFact', function ($scope, $window, $routeParams, $rootScope, $location, categoriesFact) {

    $scope.category = new categoriesFact;

    var error = function(response, args){
        $rootScope.$broadcast('AlertCtrl:addAlert', {code:'the category has not been created', type:'danger'});
    };

    var success = function(response, args){
        $rootScope.$broadcast('AlertCtrl:addAlert', {code:'category created', type:'success'});
        $window.history.back();
        //$location.path('/conference/'+$routeParams.mainEventId+'/categories/list');
    };

    $scope.create = function(form){
        $scope.category.mainEvent = $routeParams.mainEventId;
        if ( form.$valid ) {
            $scope.category.$create({}, success, error);
        }
    }
}
]);

/**
 * Edit category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesEditCtrl', [ '$scope', '$window', '$rootScope', '$routeParams', '$location', 'categoriesFact', function ($scope, $window,  $rootScope, $routeParams, $location, categoriesFact)
{
    $scope.category = categoriesFact.get({id: $routeParams.categoryId});

    var error = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'the category has not been saved', type: 'danger'});
    };

    var success = function (response, args)
    {
        $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'category saved', type: 'success'});
        $window.history.back();
    };

    $scope.update = function (form)
    {
        if (form.$valid)
        {
            $scope.category.$update({}, success, error);
        }
    }
}]);

/**
 * Show category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesShowCtrl', [ '$scope', '$routeParams', 'categoriesFact', function ($scope, $routeParams, categoriesFact)
{
    $scope.category = categoriesFact.get({id: $routeParams.categoryId});

}]);

/**
 * Delete category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesDeleteCtrl', [ '$scope', 'categoryModel', function ($scope, categoryModel)
{
    $scope.category = categoryModel;
}]);

