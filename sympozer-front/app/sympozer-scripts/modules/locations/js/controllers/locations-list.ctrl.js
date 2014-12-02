/**
 * List location controller
 *
 * @type {controller}
 */
angular.module('locationsApp').controller('locationsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'locationsFact', '$modal', 'pinesNotifications', 'translateFilter', function ($scope, $routeParams, GLOBAL_CONFIG, locationsFact, $modal, pinesNotifications, translateFilter)
{
    //Prepare entity list for the locations list handling
    $scope.entities = [];

    //Declare request to execute on search query
    $scope.request = locationsFact.allByConference;


    //Clone a specific location in the entity list
    $scope.clone = function (location)
    {
        var clonelocation = angular.copy(location);
        delete clonelocation.id;

        var error = function (response, args)
        {
            //Notify of error on delete request
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('Clone not completed'),
                type: 'error'
            });
        }

        var success = function (response, args)
        {
            //Notify of success on post request
            pinesNotifications.notify({
                title: translateFilter('global.validations.error'),
                text: translateFilter('location saved'),
                type: 'success'
            });
            $scope.entities.push(response);
        }

        locationsFact.$create(locationsFact.serialize(clonelocation), success, error);

    }

    //Delete modal to remove location
    $scope.deleteModal = function (index, location)
    {
        //Store location index in list for further actions
        $scope.index = index;

        //Open the new modal with specific ctrl and view
        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.locations.urls.partials + 'modals/locations-delete-modal.html',
            controller: 'locationsDeleteCtrl',
            size: "large",
            resolve: {
                //Pass the clicked location to the modal
                locationModel : function(){
                    return location;
                }
            }
        });

        //When modal promise resolved, remove location from the list
        modalInstance.resolve = function(){
            $scope.entities.splice(index, 1);
        }
    }

}]);