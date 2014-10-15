
/**
 * List conference controller
 *
 * @type {controller}
 */
angular.module('mainEventsApp').controller('mainEventsListCtrl', ['$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'mainEventsFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, mainEventsFact, $cachedResource)
{
    $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

    $scope.entities = [];

    $scope.fetch = function(filters, success, error){
        mainEventsFact.all(filters, success, error);
    };

    $scope.clone = function (conference, index)
    {

        var cloneConference = angular.copy(conference);
        delete cloneConference.id;

        var error = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
        }

        var success = function (response, args)
        {
            $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Conference saved', type: 'success'});
            $scope.entities.splice(index + 1, 0, response);
        };

        cloneConference.$create({}, success, error);
    };


    $scope.deleteModal = function (index, conference)
    {
        $scope.index = index;

        createDialogService(GLOBAL_CONFIG.app.modules.mainEvents.urls.partials + 'mainEvents-delete.html', {
            id: 'complexDialog',
            title: 'Conference deletion',
            backdrop: true,
            controller: 'mainEventsDeleteCtrl',
            success: {label: 'Ok', fn: function ()
            {
                mainEventsFact.delete({id: conference.id});
                $scope.entities.splice(index, 1);
            }}
        }, {
            conferenceModel: conference
        });
    }
}]);