/**
 * List events controller
 *
 * @type {controller}
 */
angular.module('eventsApp').controller('eventsListCtrl', ['$scope', 'categoriesFact', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'eventsFact', '$modal', 'pinesNotifications', 'translateFilter', function ($scope, categoriesFact, $routeParams, GLOBAL_CONFIG, $rootScope, eventsFact, $modal, pinesNotifications, translateFilter)
{

    //Context change
    //$rootScope.$broadcast('contextCtrl:changeContext', {mainEventId:$routeParams.mainEventId});

    $scope.entities = [];

    //Fetch all current main event event categories
    categoriesFact.allByConference({'mainEventId': $routeParams.mainEventId}, function(response){
        $scope.categories = response.results;
    });

    $scope.request = eventsFact.allByConference;

    //Initialize filters for the event list
    $scope.filters = {};
    $scope.filters.categoryVersionIds = [];

    var i = 0; // clone counter


    //Add a category to filter event list on
    $scope.addCategoriesFilter = function (categoryVersionId)
    {
        //test if the category is already in the filters
        var categoryVersionIndex = $scope.filters.categoryVersionIds.indexOf(categoryVersionId);

        //If no, add it
        if (categoryVersionIndex == -1)
        {
            $scope.filters.categoryVersionIds.push(categoryVersionId);
        }
        //If yes remove it
        else
        {
            $scope.filters.categoryVersionIds.splice(categoryVersionIndex, 1);
        }

        //Trigger the entity-list-handler filter function to send request
        $scope.filter();
    };


    //Handle clone function
    $scope.clone = function (event, index)
    {
        $scope.index = index;
        var error = function (response, args)
        {
            //Notify of the creation action error
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('events.validations.not_created'),
                type: 'error'
            });
        };
        var success = function (response, args)
        {
            debugger;
            //Notify of the creation action success
            pinesNotifications.notify({
                title: translateFilter('global.validations.success'),
                text: translateFilter('events.validations.created'),
                type: 'success'
            });
            $scope.entities.splice($scope.index + 1, 0, response);
        };
        eventsFact.clone(event, success, error);
    };


    //Handle remove a category from the list
    $scope.deleteModal = function (index, event)
    {
        //Store index of the object in the tab for further deletion
        $scope.index = index;

        //Open a new modal with delete template
        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.events.urls.partials + 'modals/events-delete-modal.html',
            controller: 'eventsDeleteCtrl',
            size: "large",
            resolve: {
                eventModel : function(){
                    return event;
                }
            }
        });

        //When modal instance promise is resolved with 'ok' then remove the event from the list
        modalInstance.result.then(function (event){
            $scope.entities.splice($scope.index, 1);
        })
    }

}]);
