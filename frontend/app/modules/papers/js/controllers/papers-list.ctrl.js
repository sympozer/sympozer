/**
 * List papers controller
 *
 * @type {controller}
 */
angular.module('papersApp').controller('papersListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'papersFact', '$cachedResource', 'pinesNotifications', 'translateFilter', '$modal', function ($scope, $routeParams, GLOBAL_CONFIG, $rootScope, papersFact, $cachedResource, pinesNotifications, translateFilter, $modal)
{

    //Initialize papers list array
    $scope.entities = [];

    //Request to trigger when scroll detected (for infinite scroll)
    $scope.request = papersFact.allByConference;


    //Clone function, create a copy of a specific paper
    $scope.clone = function (paper, index)
    {
        $scope.index = index;

        //On clone error
        var error = function (response, args)
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('papers.validations.not_created'),
                type: 'error'
            });
        };

        //On clone success
        var success = function (response, args)
        {
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('papers.validations.created'),
                type: 'success'
            });

            $scope.entities.splice($scope.index + 1, 0, response);

        };

        //Send post request to server
        papersFact.clone(paper, success, error);
    };


    //Handle remove a category from the list
    $scope.deleteModal = function (index, paper)
    {
        //Store index of the object in the tab for further deletion
        $scope.index = index;

        //Open a new modal with delete template
        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.papers.urls.partials + 'modals/papers-delete-modal.html',
            controller: 'papersDeleteCtrl',
            size: "large",
            resolve: {
                paperModel : function(){
                    return paper;
                }
            }
        });

        //When modal instance promise is resolved with 'ok' then remove the paper from the list
        modalInstance.result.then(function (paper)
        {
            $scope.entities.splice($scope.index, 1);
        })

    }


}]);