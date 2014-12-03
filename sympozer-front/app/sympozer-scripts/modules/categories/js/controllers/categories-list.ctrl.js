
/**
 * List category controller
 *
 * @type {controller}
 */
angular.module('categoriesApp').controller('categoriesListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'categoriesFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, $rootScope, categoriesFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;


    $scope.entities = [];
    $scope.request = categoriesFact.allByConference;


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


    //Handle remove a category from the list
    $scope.deleteModal = function (index, category)
    {
        $scope.index = index;

        //Open a new modal with delete template
        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'modals/categories-delete-modal.html',
            controller: 'categoriesDeleteCtrl',
            size: "large",
            resolve: {
                categoryModel : function(){
                    return category;
                }
            }
        });

        //When modal instance promise is resolved with 'ok' then remove the cateogy from thel ist
        modalInstance.resolve = function(){
            $scope.entities.splice(index, 1);
        }
    }

//    $scope.deleteModal = function (index, category)
//    {
//        $scope.index = index;
//
//        createDialogService(GLOBAL_CONFIG.app.modules.categories.urls.partials + 'categories-delete.html', {
//            id: 'complexDialog',
//            title: 'category deletion',
//            backdrop: true,
//            controller: 'categoriesDeleteCtrl',
//            success: {label: 'Ok', fn: function ()
//            {
//                categoriesFact.delete({id: category.id});
//                $scope.entities.splice(index, 1);
//            }}
//        }, {
//            categoryModel: category
//        });
//    }
}]);