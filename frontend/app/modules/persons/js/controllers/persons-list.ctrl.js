/**
 * List (all) persons controller
 *
 * @type {controller}
 */
angular.module('personsApp').controller('personsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', '$rootScope', 'personsFact', function ($scope, $routeParams, GLOBAL_CONFIG, $rootScope, personsFact, $modal)
{

    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    $scope.request = personsFact.allByConference;


    $scope.clone = function (person)
    {
        var clonePerson = angular.copy(person);
        clonePerson.id = null;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        };

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Person saved', type: 'success'});
            $scope.entities.push(response);
        };

        clonePerson.$create({}, success, error);
    };

    $scope.deleteModal = function (index, person)
    {
        $scope.index = index;

        var modalInstance = $modal.open({
            templateUrl: GLOBAL_CONFIG.app.modules.persons.urls.partials + 'persons-delete.html',
            controller: 'personsDeleteCtrl',
            size: "large",
            resolve: {
                personModel : function(){
                    return person;
                }
            }
        });

        modalInstance.resolve = function(data){
            $scope.entities.splice(index, 1);
        }

    }
}]);