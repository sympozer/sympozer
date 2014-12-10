/**
 * List roles labels controller
 *
 * @type {controller}
 */
angular.module('roleLabelsApp').controller('roleLabelsListCtrl', [
    '$scope', '$routeParams', 'GLOBAL_CONFIG', 'createDialog', '$rootScope', 'roleLabelsFact', '$cachedResource', function ($scope, $routeParams, GLOBAL_CONFIG, createDialogService, $rootScope, roleLabelsFact, $cachedResource)
    {
        $scope.GLOBAL_CONFIG = GLOBAL_CONFIG;

        $scope.entities = [];

        $scope.request = roleLabelsFact.allByConference;

        $scope.reload = function ()
        {
            $scope.entities.$promise.then(function ()
            {
                console.log('From cache:', $scope.entities);
            });
        };

        $scope.clone = function (roleLabel)
        {
            cloneroleLabel = angular.copy(roleLabel);
            cloneroleLabel.id = null;

            var error = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'Clone not completed', type: 'danger'});
            };

            var success = function (response, args)
            {
                $rootScope.$broadcast('AlertCtrl:addAlert', {code: 'roleLabel saved', type: 'success'});
                $scope.entities.push(response);
            };

            cloneroleLabel.$create({}, success, error);
        };


        $scope.deleteModal = function (index, roleLabel)
        {
            $scope.index = index;

            createDialogService(GLOBAL_CONFIG.app.modules.roleLabelVersions.urls.partials + 'roleLabelVersions-delete.html', {
                id        : 'complexDialog',
                title     : 'roleLabel deletion',
                backdrop  : true,
                controller: 'roleLabelsDeleteCtrl',
                success   : {label: 'Ok', fn: function ()
                {
                    roleLabelsFact.delete({id: roleLabel.id});
                    $scope.entities.splice(index, 1);
                }}
            }, {
                roleLabelModel: roleLabel
            });
        }

    }]);
