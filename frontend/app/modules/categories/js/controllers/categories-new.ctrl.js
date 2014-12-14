angular.module('categoriesApp').controller('categoriesNewCtrl', [ '$scope', '$window', '$routeParams', '$rootScope', '$location', 'categoriesFact', 'pinesNotifications', 'translateFilter', function ($scope, $window, $routeParams, $rootScope, $location, categoriesFact, pinesNotifications, translateFilter)
{

    $scope.category = new categoriesFact;

    //On post new category request failure
    var error = function (response, args)
    {

        //Notify user of creation error
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text : translateFilter('categories.validations.not_created'),
            type : 'error'
        });
    };

    //On post new category request success
    var success = function (response, args)
    {
        //Notify user of creation success
        pinesNotifications.notify({
            title: translateFilter('global.validations.error'),
            text : translateFilter('categories.validations.created'),
            type : 'error'
        });

        //If view is a modal instance then close (resolve promise with new category)
        if ($scope.$close)
        {
            $scope.$close($scope.category);
        }
        else
        {
            //If view is a page, go back to previous page
            $window.history.back();
        }
    };


    $scope.cancel = function ()
    {
        $scope.$dismiss('cancel');
    };

    $scope.create = function (form)
    {
        $scope.category.mainEvent = {id: $routeParams.mainEventId};
        if (form.$valid)
        {
            $scope.category.$create({}, success, error);
        }
    }
}
]);
