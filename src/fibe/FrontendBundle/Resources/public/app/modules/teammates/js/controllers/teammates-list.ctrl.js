/**
 * List teammates controller
 *
 * @type {controller}
 */
angular.module('teammatesApp').controller('teammatesListCtrl', [
    '$scope', 'teammatesFact', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'teammatesFact', '$cachedResource', function ($scope, teammatesFact, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, teammatesFact, $cachedResource)
    {
        $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;
        $scope.entities = [];

        $scope.filters = {};

        $scope.teammateLabelVersions = teammatesFact.allByConference({'mainEventId': $routeParams.mainEventId});
        $scope.request = teammatesFact.allByConference;
        $scope.filters.teammateLabelVersionIds = [];

        $scope.addTeammatesFilter= function(teammateLabelVersionId){
            var teammateLabelVersionIndex = $scope.filters.teammateLabelVersionIds.indexOf(teammateLabelVersionId)
            if( teammateLabelVersionIndex == -1){
                $scope.filters.teammateLabelVersionIds.push(teammateLabelVersionId);
            }else{
                $scope.filters.teammateLabelVersionIds.splice(teammateLabelVersionIndex, 1);
            }
            $scope.filter();
        }


        $scope.reload = function ()
        {
            $scope.entities.$promise.then(function ()
            {
                console.log('From cache:', $scope.entities);
            });
        };

        $scope.clone = function (teammate)
        {
            var cloneteammate = angular.copy(teammate);
            delete cloneteammate.id;

            var error = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
            };

            var success = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'teammate saved', type: 'success'});
                $scope.entities.push(response);
            };

            cloneteammate.$create({}, success, error);
        };


        $scope.deleteModal = function (index, teammate)
        {
            $scope.index = index;

            createDialogService(GLOBAL_CONFIG.app.modules.teammates.urls.partials + 'teammates-delete.html', {
                id        : 'complexDialog',
                title     : 'teammate deletion',
                backdrop  : true,
                controller: 'teammatesDeleteCtrl',
                success   : {label: 'Ok', fn: function ()
                {
                    teammatesFact.delete({id: teammate.id});
                    $scope.entities.splice(index, 1);
                }}
            }, {
                teammateModel: teammate
            });
        }

    }]);
